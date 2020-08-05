<template>
  <form action="">
    <table class="grid">
      <tbody>
        <tr class="grid-row" v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">

            <input v-if="cell.value"
              type="text"
              maxlength="1"
              :value="cell.value"
              :class="[(cell.isEven)?'colored':'']"
              pattern="[1-9]"
              required
              disabled
            />
            <input v-else
              type="text"
              v-model="value"
              :class="[(cell.isEven)?'colored':'']"
              maxlength="1"
              pattern="[1-9]"
              required
            />
          </td>

        </tr>
      </tbody>
    </table>
  </form>
</template>

<script>

// Same Numbe in Row
// TODO: Validation on Cell:
// Just Numbers [1- 9]
//
// Validation on Sudoku Rules:
// Odd Numbes in non colored fields
// Even Numbers in colored fields
// Same Number in Region
// Same Number in Row, Column
// TODO:
// highlight the correct cells on cell position

module.exports = {
  name: "Board",
  props: {
    data: {
      type: Array,
      required: true,
      default: "",
    },
  },

  data: () => {
    return {
      disabled: false,
      value: ""
    };
  },

  methods:{
    showIdFromData(rowId, colId) {
      console.log(data[rowId][colId])
    }
  },

  watch: {
    // this watches an input and check if the input is a number from 1-9
    inputValue: {
      handler: function(value) {
        console.log(value)
      }
    }
  }

};
</script>

<style lang="scss" scoped>

$board_border: 2px;
$board_border_color: #000;
$cell_border_color: #d3d3d3;
$even_cell_color: #90ee90;

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
  input[disabled] {
    color: #000;
  }
//  input:invalid {
//    background: coral;
//  }
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

