<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <h1>sudoku-solver</h1>
        <a href="https://github.com/lukasjoc/sudoku">v.{{version}}</a>
      </header>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",
  created() {
    this.getVersion();
  },
  data: () => {
    return {
      version: "" as string,
    };
  },
  methods: {
    getVersion() {
      const package_version: string = JSON.stringify(
        require("../package.json").version
      );
      this.version = package_version;
    },
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

button {
  font-size: 100%;
  padding: 0.5em 1em;
  color: rgba(0, 0, 0, 0.8);
  border: none rgba(0, 0, 0, 0);
  text-decoration: none;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-image: linear-gradient(
    transparent,
    rgba(0, 0, 0, 0.05) 40%,
    rgba(0, 0, 0, 0.1)
  );
}

header {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;

  align-items: center;
  padding: 0.35rem;
  * {
    margin: 0.25rem;
  }
}

.wrapper {
  width: 90%;
  margin: 0 auto;
}
</style>