<template>
  <div class="solve">
    <div v-if="this.puzzle.length ? true : false">
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
import { SudokuGrid, SudokuStringItems } from "@/@types/shims-sudoku";
import { changePageTitle, parseString } from "../assets/ts/shared";

export default Vue.extend({
  name: "Solve",
  components: {
    Board,
  },
  beforeCreate() {
    changePageTitle(`Solve ${this.$route.query.puzzle}`);
  },
  mounted() {
    this.parsePuzzle();
  },
  data: () => {
    return {
      puzzle: [] as SudokuGrid,
    };
  },
  methods: {
    parsePuzzle() {
      let puzzles: SudokuStringItems = JSON.parse(localStorage.puzzles);
      let paramsPuzzle = this.$route.query.puzzle as string;
      for (let i = 0; i < puzzles.length; i++) {
        if (puzzles[i].puzzle === paramsPuzzle) {
          this.puzzle = parseString(puzzles[i].puzzle);
        }
      }
      return;
    },
  },
});
</script>

