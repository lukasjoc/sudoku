<template>
  <div class="solve">
    <h3>Odd/Even Base Sudoku</h3>
    <Board :data="defaultData"  />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Board from "../components/Board.vue";
import defaultData from "../data";

export default Vue.extend({
  name: "Edit",
  components: {
    Board,
  },
  data: () => {
    return {
      defaultData
    }
  }
});
</script>

