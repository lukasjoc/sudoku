<template>
  <div class="solve">
    <div v-if="isPuzzle()">
      <Board :data="puzzle" />
    </div>
    <div v-else>
      <h2>The Puzzle {{this.$route.query.puzzle}} could not be found</h2>
      <router-link :to="{name:'Index'}">
        <button type="button">Go Home</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Board from "../components/Board.vue";
import Parser from "../Parser";
import { SudokuGrid } from '@/shims-sudoku';

export default Vue.extend({
  name: "Solve",
  components: {
    Board,
  },
  data: () => {
    return {
      puzzle: [] as SudokuGrid,
    };
  },
  mounted() {
    this.parsePuzzle();
  },
  methods: {
    isPuzzle() {
      if (this.puzzle.length >= 1) return true
      return false;
    },
    parsePuzzle() {
      const parser = new Parser();
      let puzzles = JSON.parse(localStorage.puzzles);
      let paramsPuzzle = this.$route.query.puzzle;
      for (let i = 0; i < puzzles.length; i++) {
        if (puzzles[i].puzzle === paramsPuzzle) {
          this.puzzle = parser.fromStr(puzzles[i].puzzle);
        }
      }
      return;
    },
  },
});
</script>

