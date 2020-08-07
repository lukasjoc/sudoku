<template>
  <div class="solve">
    <h3>Odd/Even Base Sudoku</h3>
    <Board :data="puzzle" />
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
      puzzle: [[{}]],
    };
  },
  mounted() {
    this.parsePuzzle();
  },
  methods: {
    parsePuzzle() {
      const parser = new Parser();
      this.puzzle = parser.fromStr(this.$route.params.puzzle);
    },
  },
});
</script>

