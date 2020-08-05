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
              'border-right': cellIndex === 2 || cellIndex === 5,
              'border-bottom': rowIndex === 2 || rowIndex === 5,
              'isEven': cell.isEven,
              'isDefault': cell.isOriginal,
              'isActive': activeRow === rowIndex && activeCol === cellIndex,
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
    makeActive(row, cell, defaultVal) {
      if (defaultVal) return;
      if (this.activeRow === row && this.activeCol === cell) {
        this.activeRow = -1;
        this.activeCol = -1;
        return;
      }
      this.activeRow = row;
      this.activeCol = cell;
    },

    // TODO: refact this later to be easier to read
    setValue(value) {
      let current_pos = this.data[this.activeRow][this.activeCol];
      if (current_pos.isEven) {
        if (value % 2 === 0) {
          current_pos.value = value;
          this.activeRow = -1;
          this.activeCol = -1;
        } else {
          console.log(`This field just allows even values! given: ${value}`);
        }
      } else {
        if (value % 2 !== 0) {
          current_pos.value = value;
          this.activeRow = -1;
          this.activeCol = -1;
        } else {
          console.log(`This field just allows odd values! given: ${value}`);
        }
      }
    },

    isCellInvalid(row, col, value) {
      // TODO: check in col, row and region for same number
      // Add class to change color to red if false
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

.btn {
  width: 38px;
  height: 38px;
  font-size: 24px;
  cursor: pointer;
}

.btn:disabled {
  cursor: not-allowed;
}

</style>
