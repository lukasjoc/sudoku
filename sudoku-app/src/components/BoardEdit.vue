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

      <button type="button" class="btn ctrl-btn" @click="saveChanges">Save Changes</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Parser from "../Parser";
import axios from "axios";
import Board from "./Board.vue";
import { SudokuGrid } from '@/shims-sudoku';

export default Vue.extend({
  name: "BoardEdit",
  components: { Board },
  data: () => {
    return {
      activeRow: -1 as number,
      activeCol: -1 as number,
      data: [] as SudokuGrid, 
      hasSolution: true as boolean,
    };
  },
  mounted() {
    this.parsePuzzle();
  },
  updated() {
    this.isValidPuzzle();
  },
  methods: {
    parsePuzzle() {
      const parser = new Parser();
      this.data = parser.fromStr(this.$route.query.puzzle as string);
    },
    makeActive(row: number, cell: number, isOriginal: boolean) {
      if (this.activeRow === row && this.activeCol === cell) {
        this.activeRow = -1;
        this.activeCol = -1;
        return;
      }
      this.activeRow = row;
      this.activeCol = cell;
    },
    setValue(value: number) {
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
      let a: string = prompt("Remove all values? Then type [yes]", "") || "";
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
    renderData() {
      const parser = new Parser();
      let puzzleString = parser.fromData(this.data);
      return puzzleString;
    },
    async isValidPuzzle() {
      let puzzleString = this.renderData();
      let res = await axios.get(`http://localhost:5050/solve/${puzzleString}`);
      let data = JSON.parse(res.data);
      for (let row of data) {
        for (let col of row) {
          if (col.value === "") {
            this.hasSolution = false;
            return false;
          }
        }
      }
      this.hasSolution = true;
      return true;
    },
    saveChanges() {
      if (!this.hasSolution) {
        alert("This Puzzle is not solvable!");
        return;
      }
      let puzzles = JSON.parse(localStorage.puzzles);
      let oldPuzzle = this.$route.query.puzzle;
      let puzzleString = this.renderData();
      for (let i = 0; i < puzzles.length; i++) {
        if (puzzles[i].puzzle === oldPuzzle) {
          puzzles[i].puzzle = puzzleString;
        }
      }
      localStorage.setItem("puzzles", JSON.stringify(puzzles));
      this.$router.push({ name: "Index" });
    },
    checkValue(
      row: number,
      col: number,
      value: number,
      isEven: boolean
    ): boolean {
      if ((isEven && value % 2 !== 0) || (!isEven && value % 2 === 0)) {
        return true;
      }

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
