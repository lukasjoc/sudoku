<template>
  <div class="solve">
    <div v-if="isPuzzle()">
      <h2>Odd/Even Base Sudoku</h2>
      <Board :data="puzzle" />
    </div>
    <div v-else>
      <h2>The Puzzle {{this.$route.params.puzzle}} could not be found</h2>
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

export default Vue.extend({
  name: "Solve",
  components: {
    Board,
  },
  data: () => {
    return {
      puzzle: [],
    };
  },
  mounted() {
    this.parsePuzzle();
  },
  methods: {
    isPuzzle() {
      console.log(this.puzzle);
      if (this.puzzle.length >= 1) {
        console.log(this.puzzle.length);
        return true;
      }
      return false;
    },
    parsePuzzle() {
      const parser = new Parser();
      let puzzles = JSON.parse(localStorage.puzzles);
      let paramsPuzzle = this.$route.params.puzzle;
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

