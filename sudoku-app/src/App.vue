<template>
  <div id="app">
    <Board :data="datatest" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Board from "./components/Board.vue";
import defaultdata from "./data";

export default Vue.extend({
  name: "App",
  components: {
    Board,
  },
  data: () => {
    return {
      datatest: defaultdata
    }
  }
});
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
