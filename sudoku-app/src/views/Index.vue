<template>
  <div>
    <nav>
      <h2>My Sudokus</h2>
      <div>
        <!-- TODO: Implement Create.vue view-->
        <!--<button type="button" disabled>Create New Sudoku (v.0.2.0)</button> -->
      </div>
    </nav>

    <div class="sudoku-list">
      <div class="sudoku-listitem" v-for="(p, index) in puzzles" :key="index">
        <div class="preview">
          <Board class="board" :data="preview" :deliverControls="false" :disabled="true" />
        </div>

        <div class="actions">
          <router-link :to="{name: 'Solve', params: {puzzle: p.puzzle}}">
            <button type="button">Solve</button>
          </router-link>
          <router-link :to="{name: 'Edit', params: {puzzle: p.puzzle}}">
            <button type="button">Edit</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SudokuCell, SudokuStringItems } from "@/shims-sudoku";

import Board from "../components/Board.vue";
import Parser from "../Parser";

export default Vue.extend({
  mounted() {
    this.setDefaultPuzzle();
    this.getPuzzles();
    this.renderPreviewData();
  },
  components: {
    Board,
  },
  data: () => {
    return {
      puzzles: [],
      default_puzzle:
        "1oeoeeoe3ooeo6eooeee3oo1oeee7o1oeeoeoe8eeo5oooeooe3e4oeoo8oo6oeoooe1eeeo6eeeoooo7",
      preview: [[{}]],
    };
  },
  methods: {
    setDefaultPuzzle() {
      if(localStorage.puzzles) return
      let items: SudokuStringItems = [
        {
          id: 1,
          puzzle: this.default_puzzle,
        },
      ];
      localStorage.setItem("puzzles", JSON.stringify(items));
    },
    getPuzzles() {
      if (localStorage.puzzles) {
        this.puzzles = JSON.parse(localStorage.puzzles);
      }
    },
    renderPreviewData() {
      const parser = new Parser();
      this.preview = parser.fromStr(this.default_puzzle);
    },
  },
});
</script>

<style lang="scss">
$card_spacing: 0.35rem;

nav {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
}

nav {
  height: 5rem;
  align-items: center;
  justify-content: space-between;
  margin: $card_spacing;
}

.sudoku-list,
.actions,
.preview {
  width: 100%;
}

.sudoku-list {
  display: flex;
  flex-flow: row wrap;
}

.sudoku-listitem {
  margin: $card_spacing;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.preview {
  padding: $card_spacing;
  filter: grayscale(60%);
}

.actions {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  button {
    margin: $card_spacing;
  }
}
</style>