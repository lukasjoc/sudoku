<template>
  <div class="solve">
    <h3>Odd/Even Base Sudoku</h3>
    <Board :data="puzzle"  />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Board from "../components/Board.vue";
import Parser from "../Parser";

export default Vue.extend({
  name: "Edit",
  components: {
    Board,
  },
  data: () => {
    return {
      default_puzzle: "1oeoeeoe3ooeo6eooeee3oo1oeee7o1oeeoeoe8eeo5oooeooe3e4oeoo8oo6oeoooe1eeeo6eeeoooo7",
      puzzle: [[{}]]
    }
  },
  mounted(){
    this.parsePuzzle()
  },
  methods: {
    parsePuzzle() {
      const p = new Parser()
      let data = p.fromStr(this.default_puzzle)
      this.puzzle = data
      console.log(data)
    }
  }

});
</script>

