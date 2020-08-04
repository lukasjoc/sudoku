<template>
  <table class="grid">
    <tbody>
      <tr class="grid-row" v-for="row in data" :key="row.value">
        <td v-for="cell in row" :key="cell.value">
          <input
            type="text"
            maxlength="1"
            :value="cell.value"
            :disabled="(cell.value)?!disabled:disabled"
            :class="[(cell.isEven)?'colored':'']"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
module.exports = {
  name: "Board",
  props: {
    data: {
      type: Object,
      required: true,
      default: "",
    },
  },
  data: () => {
    return {
      disabled: false,
      hover: false,
    };
  },
};
</script>

<style lang="scss" scoped>
$board_border: 2px;
$board_border_color: #000;
$cell_border_color: #d3d3d3;
$even_cell_color: #e45757;
table {
  width: 28rem;
  height: 28rem;
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
  border: 1.5px solid $cell_border_color;

  input {
    background: #fff;
    border: none;
    text-align: center;
    outline: none;
    font-size: 1.5rem;
    transition: background 0.2s;
  }

  //  input:hover {
  //    background:$cell_border_color;
  //    transition: background 0.2s;
  //  }

  input[disabled] {
    color: #000;
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

.colored {
  background: $even_cell_color;
}
</style>

