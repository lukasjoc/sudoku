<template>
  <div class="solve">
     <!-- <button @click="goBack()">Go Back</button> -->
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
      this.puzzle = parser.fromStr(this.$route.query.puzzle);
    },
   //  goBack() {
   //    this.$router.go(-1)
   //  }
  },
 
});
</script>

