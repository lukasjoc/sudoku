<template>
  <div>
    <nav>
      <h2>My Sudokus</h2>
    </nav>
    <div class="sudoku-list">
      <div class="sudoku-listitem" v-for="(p, index) in puzzles" :key="index">
        <div class="preview">
          <Board
            class="board"
            :data="parseString(p.puzzle)"
            :deliverControls="false"
            :disabled="true"
          />
        </div>

        <div class="actions">
          <div class="text">
            <h3>Default Odd/Even Sudoku</h3>
          </div>
          <div class="buttons">
            <router-link :to="{name: 'Solve', query: {puzzle: p.puzzle}}">
              <button type="button">Solve</button>
            </router-link>
            <router-link :to="{name: 'Edit', query: {puzzle: p.puzzle}}">
              <button type="button">Edit</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  SudokuCell,
  SudokuStringItems,
  SudokuGrid,
} from "@/@types/shims-sudoku";
import { changePageTitle, parseString } from "../assets/ts/shared";
import Board from "../components/Board.vue";

export default Vue.extend({
  beforeCreate() {
    changePageTitle(`My Sudokus`);
  },
  mounted() {
    this.setDefault();
    this.getPuzzles();
  },
  components: {
    Board,
  },
  data: () => {
    return {
      puzzles: [] as SudokuStringItems,
      version: "" as string,
    };
  },
  methods: {
    // Shared Methods
    parseString,
    setDefault() {
      if (localStorage.puzzles) return;
      let default_puzzles: SudokuStringItems = [
        {
          id: 1,
          puzzle:
            "1oeoeeoe3ooeo6eooeee3oo1oeee7o1oeeoeoe8eeo5oooeooe3e4oeoo8oo6oeoooe1eeeo6eeeoooo7",
        },
      ];
      localStorage.setItem("puzzles", JSON.stringify(default_puzzles));
    },
    getPuzzles() {
      if (localStorage.puzzles) {
        this.puzzles = JSON.parse(localStorage.puzzles);
      }
    },
  },
});
</script>

<style lang="scss">
$card_spacing: 0.35rem;

nav {
  height: 5rem;
  align-items: center;
  justify-content: space-between;
  margin: $card_spacing;
}

.sudoku-list,
.actions,
.preview,
nav {
  width: 100%;
}

.sudoku-list,
.actions,
nav {
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
  align-items: center;
  justify-content: space-around;
  button {
    margin: $card_spacing;
  }
}
</style>