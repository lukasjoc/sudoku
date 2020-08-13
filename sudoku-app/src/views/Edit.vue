<template>
  <div class="solve">
    <BoardEdit :data="puzzle" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BoardEdit from "../components/BoardEdit.vue";
import Parser from "../Parser";
import { SudokuGrid } from "@/shims-sudoku";

export default Vue.extend({
  name: "Solve",
  components: {
    BoardEdit,
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
    parsePuzzle() {
      const parser = new Parser();
      this.puzzle = parser.fromStr(this.$route.query.puzzle as string);
    },
  },
});
</script>

