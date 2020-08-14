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
              'error': cell.value && checkValue(data, rowIndex, cellIndex, cell.value, cell.isEven)
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
import axios from "axios";
import Board from "./Board.vue";
import Parser from "../assets/ts/Parser";
import { SudokuGrid } from "@/@types/shims-sudoku";
import {
  solvePuzzle,
  fromData,
  parseString,
  showMessage,
  checkValue,
} from "@/assets/ts/shared";

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
    this.data = parseString(this.$route.query.puzzle as string);
  },
  updated() {
    this.isValidPuzzle();
  },
  methods: {
    checkValue,

    resetBoard() {
      this.activeRow = -1;
      this.activeCol = -1;
    },
    
    makeActive(row: number, cell: number, isOriginal: boolean) {
      if (this.activeRow === row && this.activeCol === cell) {
        this.resetBoard();
        return;
      }
      this.activeRow = row;
      this.activeCol = cell;
    },

    setValue(value: number) {
      this.data[this.activeRow][this.activeCol].value = value;
      this.resetBoard();
    },

    removeValue() {
      this.data[this.activeRow][this.activeCol].value = null;
      this.resetBoard();
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
      this.data[this.activeRow][this.activeCol].isEven = true;
      this.resetBoard();
    },

    markOdd() {
      this.data[this.activeRow][this.activeCol].isEven = false;
      this.resetBoard();
    },

    async isValidPuzzle() {
      let puzzleString: string = fromData(this.data);
      const data = await solvePuzzle(puzzleString);
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
        showMessage("This puzzle is not solvable!");
        return;
      }
      let puzzles = JSON.parse(localStorage.puzzles);
      let oldPuzzle = this.$route.query.puzzle;
      let puzzleString = fromData(this.data);
      for (let i = 0; i < puzzles.length; i++) {
        if (puzzles[i].puzzle === oldPuzzle) {
          puzzles[i].puzzle = puzzleString;
        }
      }
      localStorage.setItem("puzzles", JSON.stringify(puzzles));
      this.$router.push({ name: "Index" });
    },

  },
});
</script>