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
        <div class="sudoku-listitem">
          <div class="preview">Odd/Even Base Sudoku</div>
          <div class="actions">
            <button type="button">
              <router-link :to="{name: 'Solve'}">Solve</router-link>
            </button>
            <button type="button">
              <router-link :to="{name: 'Edit'}">Edit</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss">

nav {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
}

nav {
  height: 5rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.sudoku-list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  // background: yellow;
}

.sudoku-listitem {
  border-radius: 2px;
  width: 28rem;
  height: 28rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin: 1rem;
  padding: 1rem;
}

.preview {
  width: 100%;
  height: 80%;
  background: #eee;
  font-size: 100%;
  padding: 1rem;
}

.actions {
  width: 100%;
  height: 20%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  button {
    margin: 0.25rem;
  }
}
</style>