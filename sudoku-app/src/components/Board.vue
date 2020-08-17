<template>
  <div class="board">
    <table>
      <tbody v-if="!disabled">
        <tr v-for="(row, rowIndex) in puzzleData" :key="rowIndex">
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
              'error': cell.value && checkValue(data, rowIndex, cellIndex, cell.value, cell.isEven),
            }"
            @click="makeActive(rowIndex, cellIndex, cell.isOriginal)"
          >{{cell.value}}</td>
        </tr>
      </tbody>

      <tbody v-else>
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
            }"
          >{{cell.value}}</td>
        </tr>
      </tbody>
    </table>

    <div class="row" v-if="deliverControls">
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

      <button type="button" class="btn ctrl-btn" @click="solve">Auto Solve</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SudokuGrid, SudokuCell } from "@/@types/shims-sudoku";
import { showMessage, solvePuzzle, checkValue } from "@/assets/ts/shared";

export default Vue.extend({
  name: "Board",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    } as PropOptions<SudokuGrid>,
    deliverControls: {
      type: Boolean,
      required: false,
      default: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => {
    return {
      activeRow: -1 as number,
      activeCol: -1 as number,
      puzzleData: [] as SudokuGrid,
    };
  },
  mounted() {
    this.puzzleData = this.data;
  },
  methods: {
    checkValue,
    solvePuzzle,

    resetBoard() {
      this.activeRow = -1;
      this.activeCol = -1;
    },

    async solve() {
      let puzzleString = this.$route.query.puzzle as string;
      let data = await solvePuzzle(puzzleString);
      this.puzzleData = data;
      showMessage("Ok That was easy!  Try harder.. Challenge yourself");
    },

    makeActive(row: number, cell: number, isOriginal: boolean): void {
      if (isOriginal) return;
      if (this.activeRow === row && this.activeCol === cell) {
        this.resetBoard();
        return;
      }
      this.activeRow = row;
      this.activeCol = cell;
    },

    setValue(value: number): void {
      this.data[this.activeRow][this.activeCol].value = value;
      this.resetBoard();
      if (this.isComplete()) {
        showMessage("Puzzle Complete!");
      }
    },

    removeValue() {
      this.data[this.activeRow][this.activeCol].value = null;
      this.resetBoard();
    },

    isComplete(): boolean {
      for (let r = 0; r < 9; r += 1) {
        for (let c = 0; c < 9; c += 1) {
          const value = this.data[r][c].value;
          const isEven = this.data[r][c].isEven;
          if (checkValue(this.data, r, c, value, isEven)) return false;
        }
      }
      return true;
    },
  },
});
</script>
