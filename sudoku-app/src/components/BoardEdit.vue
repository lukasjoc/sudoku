<template>
  <div class="board">
    <h3>Edit</h3>
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
      <button type="button" class="btn ctrl-btn" @click="removeValues">Erase All</button>
      <button
        type="button"
        class="btn ctrl-btn"
        :disabled="activeRow === -1 || activeCol === -1"
        @click="markEven"
      >Mark Even</button>
      <button
        type="button"
        class="btn ctrl-btn"
        :disabled="activeRow === -1 || activeCol === -1"
        @click="markOdd"
      >Mark Odd</button>

      <button type="button" class="btn ctrl-btn" @click="saveChangesAndReload">Save Changes</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Parser from "../Parser";

export default Vue.extend({
  name: "BoardEdit",
  data: () => {
    return {
      activeRow: -1,
      activeCol: -1,
      data: [],
    };
  },
  mounted() {
    this.parsePuzzle();
  },
  methods: {
    parsePuzzle() {
      const parser = new Parser();
      this.data = parser.fromStr(this.$route.params.puzzle);
    },
    makeActive(row, cell, isOriginal) {
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
    removeValues() {
      let a = prompt("Remove all values? Then type [yes]", "");
      if (a.toLowerCase() !== "yes") return;
      for (let i of this.data) {
        for (let ii of i) {
          ii.value = null;
          ii.isEven = false;
          ii.isOriginal = false;
        }
      }
    },
    markEven() {
      let current_pos = this.data[this.activeRow][this.activeCol];
      current_pos.isEven = true;
      this.activeRow = -1;
      this.activeCol = -1;
    },
    markOdd() {
      let current_pos = this.data[this.activeRow][this.activeCol];
      current_pos.isEven = false;
      this.activeRow = -1;
      this.activeCol = -1;
    },
    saveChangesAndReload() {

      if(this.isNotValid()) {
        alert("OK YOU MESSED SOMETHING UP. PLEASE FIX IT")
        return
      }

      const parser = new Parser();
      let puzzleString = parser.fromData(this.data);
      let puzzles = JSON.parse(localStorage.puzzles);
      let oldPuzzle = this.$route.params.puzzle;

      for (let i = 0; i < puzzles.length; i++) {
        if (puzzles[i].puzzle === oldPuzzle) {
          puzzles[i].puzzle = puzzleString;
        }
      }

      localStorage.setItem("puzzles", JSON.stringify(puzzles));
      this.$router.push({ name: "Index" });
    },

  isNotValid() {
    // TOOD: must have 4  colored fields in region, row, and col
    // TODO: not basic rules same number in region, row, col etc
    // TODO: not even Numbers in uneven fields
    // TODO: at least one even fields as marking
    return false
  },

  checkValue(row, col, value, isEven) {
      if (isEven && value % 2 !== 0) return true;
      if (!isEven && value % 2 === 0) return true;

       // search in row for dup value
      for (let c = 0; c < 9; c++) {
        if (this.data[row][c].value === value && c !== col) {
          return true;
        }
      }
      // search in column for dup value
      for (let r = 0; r < 9; r++) {
        if (this.data[r][col].value === value && r !== row) {
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
});
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

.btn:disabled {
  cursor: not-allowed;
}

.row {
  button {
    margin: 0.25rem;
  }
  display: flex;
  flex-flow: row wrap;
}
</style>