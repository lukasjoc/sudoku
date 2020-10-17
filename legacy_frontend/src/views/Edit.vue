<template>
  <div class="solve">
    <BoardEdit :data="puzzle" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BoardEdit from "../components/BoardEdit.vue";
import Parser from "../assets/ts/Parser";
import { SudokuGrid } from "@/@types/shims-sudoku";
import { changePageTitle, parseString } from "../assets/ts/shared";

export default Vue.extend({
  name: "Solve",
  components: {
    BoardEdit,
  },
  beforeCreate() {
    changePageTitle(`Solve ${this.$route.query.puzzle}`);
  },
  mounted() {
    this.puzzle = parseString(this.$route.query.puzzle as string);
  },
  data: () => {
    return {
      puzzle: [] as SudokuGrid,
    };
  },
});
</script>

