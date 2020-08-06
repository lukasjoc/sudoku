<template>
  <div class="board">
    <table>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="cell"
            :class="{
              'isEven': cell.isEven,
              'isDefault': cell.isOriginal,
              'border-right': cellIndex === 2 || cellIndex === 5,
              'border-bottom': rowIndex === 2 || rowIndex === 5,
              'isActive': activeRow === rowIndex && activeCol === cellIndex,
              'error': cell.value && checkValue(rowIndex, cellIndex, cell.value, cell.isEven)
            }"
            @click="makeActive(rowIndex, cellIndex, cell.isOriginal)"
          >{{cell.value}}</td>
        </tr>
      </tbody>
    </table>

    <div class="row">
      <button
        type="button"
        class="btn"
        v-for="value in Array(9).keys()"
        :key="value"
        :disabled="activeRow === -1 || activeCol === -1"
        @click="setValue(value + 1)"
      >{{ value + 1 }}</button>

      <button
        type="button"
        class="btn ctrl-btn"
        :disabled="activeRow === -1 || activeCol === -1"
        @click="removeValue"
      >Erase</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "Board",
  props: {
    data: {
      type: Array,
      required: true,
      default: "",
    },
  },

  data: () => {
    return {
      activeRow: -1,
      activeCol: -1,
    };
  },

  methods: {
    makeActive(row, cell, isOriginal) {
      if (isOriginal) return;
      if (this.activeRow === row && this.activeCol === cell) {
        this.activeRow = -1;
        this.activeCol = -1;
        return;
      }
      this.activeRow = row;
      this.activeCol = cell;
    },

    setValue(value) {
      let current_pos = this.data[this.activeRow][this.activeCol];
      current_pos.value = value;
      this.activeRow = -1;
      this.activeCol = -1;
    },

    removeValue() {
      let current_pos = this.data[this.activeRow][this.activeCol];
      current_pos.value = null;
      this.activeRow = -1;
      this.activeCol = -1;
    },

    checkValue(row, col, value, isEven) {
      if (!value) return true;

      if (isEven && value % 2 !== 0) return true;
      if (!isEven && value % 2 === 0) return true;

      // search in row for dup value
      for (let c = 0; c < 9; c++) {
        if (
          this.data[row][c].value === value &&
          this.data[row][c].isOriginal === false &&
          c !== col
        ) {
          return true;
        }
      }

      // search in column for dup value
      for (let r = 0; r < 9; r++) {
        if (
          this.data[r][col].value === value &&
          this.data[r][col].isOriginal === false &&
          r !== row
        ) {
          return true;
        }
      }

      // search in region for dup value
      const rowStart = Math.floor(row / 3) * 3;
      const colStart = Math.floor(col / 3) * 3;
      for (let r = rowStart; r < rowStart + 3; r += 1) {
        for (let c = colStart; c < colStart + 3; c += 1) {
          if (this.data[r][c].value === value && !(r === row && c === col)) {
            return true;
          }
        }
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
$board_border: 2.5px;
$board_border_color: #333;
$cell_border_color: #d3d3d3;
$even_cell_color: #90ee90;
$cell_color: #fff;

table {
  width: 28rem;
  height: 28rem;
  border-collapse: collapse;
  border-spacing: 0;
}

td {
  margin: 0;
  padding: 0;
  width: calc(100% / 9);
  height: calc(100% / 9);
  text-align: center;
  font-size: 2rem;
  background-color: $cell_color;
  border: 1.5px solid $cell_border_color;
  outline: none;
}

.cell.border-right {
  border-right: $board_border solid $board_border_color;
}

.cell.border-bottom {
  border-bottom: $board_border solid $board_border_color;
}

.cell.isActive {
  background: #add8e6;
}

.cell.isEven {
  background: $even_cell_color;
}

.cell.isDefault {
  font-weight: bold;
  color: #c00;
}

.cell.error {
  background-color: #c00;
  color: #fff;
}

.ctrl-btn,
.btn {
  font-size: 24px;
  cursor: pointer;
}

.btn {
  width: 38px;
  height: 38px;
}

.ctrl-btn {
  width: auto;
  height: 38px;
}

.btn:disabled {
  cursor: not-allowed;
}
</style>
