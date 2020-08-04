<template>
  <div>
    <table>
      <tbody>
        <tr v-for="row in data" :key="row.value">
          <td v-for="cell in row" :key="cell.value">
            <input type="text" :value="cell.value" maxlength="1" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  module.exports = {
    props: {
      data: Object
    },
    data: () => {
      return {
        // pass
      };
    },
  };
</script>

<style lang="scss" scoped>
$board_border: 2px;
$board_border_color: #000;
$cell_border_color: lightgrey;

table {
  width: 35rem;
  height: 35rem;
  border-collapse: collapse;
  border-spacing: 0;
}

tbody,
td > input {
  width: 100%;
  height: 100%;
}

td,
td > input {
  margin: 0;
  padding: 0;
}

td {
  width: calc(100% / 9);
  height: calc(100% / 9);
  border: 1px solid $cell_border_color;

  input {
    border: none;
    text-align: center;
    outline: none;
    font-size: 1.5rem;
  }

  input:hover {
    background: $cell_border_color;
    transition: ease-in-out 0.2s;
  }
}

tr:nth-child(3n) {
  border-bottom: $board_border solid $board_border_color;
}
tr:nth-child(3n + 1) {
  border-top: $board_border solid $board_border_color;
}

td:nth-child(3n) {
  border-right: $board_border solid $board_border_color;
}

td:nth-child(3n + 1) {
  border-left: $board_border solid $board_border_color;
}
</style>

