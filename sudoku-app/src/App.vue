<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <h1>sudoku-solver</h1>
        <a href="https://github.com/lukasjoc/sudoku">{{application_version}}</a>
      </header>
      <div class="play-area">
        <Board class="board" :data="defaultdata"  />
      </div>
    </div>
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
      defaultdata,
      application_version: process.env.VERSION,
    };
  },
});
</script>

<style lang="scss">

$basecolor: #000;

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 100%;
}

a {
  text-decoration: none;
  color: $basecolor;
}

h1 {
  font-size: 3rem;
}

header {
  width: 100%;
  height: 5rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.play-area {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;
  background: rgb(240, 240, 240);
}

.wrapper {
  width: 80%;
  margin: 0 auto;
}

</style>
