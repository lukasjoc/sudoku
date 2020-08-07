<template>
  <div class="solve">
    <BoardEdit :data="puzzle" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BoardEdit from "../components/BoardEdit.vue";
import Parser from "../Parser";

export default Vue.extend({
  name: "Solve",
  components: {
    BoardEdit,
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

