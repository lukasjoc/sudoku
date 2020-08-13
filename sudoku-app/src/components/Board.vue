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
              'error': cell.value && checkValue(rowIndex, cellIndex, cell.value, cell.isEven),
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

      <button type="button" class="btn ctrl-btn" @click="autoSolve">Auto Solve</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import axios from "axios";
import { SudokuGrid, SudokuCell } from "@/@types/shims-sudoku";

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
    this.setData();
    console.log(this.setData());
  },
  methods: {
    setData() {
      this.puzzleData = this.data;
    },
    async autoSolve() {
      try {
        let res = await axios.get(
          `http://localhost:5050/solve/${this.$route.query.puzzle}`
        );
        this.puzzleData = JSON.parse(res.data);
      } catch (err) {
        alert(`${err}: Server isn't reachable`);
      }
    },
    makeActive(row: number, cell: number, isOriginal: boolean): void {
      if (isOriginal) return;
      if (this.activeRow === row && this.activeCol === cell) {
        this.activeRow = -1;
        this.activeCol = -1;
        return;
      }
      this.activeRow = row;
      this.activeCol = cell;
    },

    setValue(value: number): void {
      let current_pos = this.data[this.activeRow][this.activeCol];
      current_pos.value = value;
      this.activeRow = -1;
      this.activeCol = -1;

      if (this.isComplete()) {
        this.showMessage("Success - Great Work!");
      }
    },

    showMessage(msg: string) {
      alert(msg);
    },

    isComplete(): boolean {
      for (let r = 0; r < 9; r += 1) {
        for (let c = 0; c < 9; c += 1) {
          let value = this.data[r][c].value;
          let isEven = this.data[r][c].isEven;
          if (this.checkValue(r, c, value, isEven)) return false;
        }
      }
      return true;
    },

    checkValue(
      row: number,
      col: number,
      value: number,
      isEven: boolean
    ): boolean {
      if (!value) return true;
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

    removeValue() {
      let current_pos = this.data[this.activeRow][this.activeCol];
      current_pos.value = null;
      this.activeRow = -1;
      this.activeCol = -1;
    },
  },
});
</script>

