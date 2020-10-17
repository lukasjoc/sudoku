<template>
	<table>
		<tbody>
			<tr v-for="(row, rowIndex) in puzzleData" :key="rowIndex">
				<td v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell">
					{{ cell.value }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "PSolve",
	computed: {
		puzzleURL() {
			return this.$route.params.puzzle
		},
		puzzleData() {
			return this.$store.getters["getPuzzleData"](this.puzzleURL)
		},
	},
	created() {
		if (!this.$store.getters["hasPuzzleUnsolved"](this.puzzleURL)) {
			this.$store.dispatch("getPuzzle", this.puzzleURL)
		}
	},
}
</script>

<style lang="scss" scoped>
$board_border: 2.5px;
$board_border_color: #333;
$cell_border_color: #d3d3d3;
$even_cell_color: #90ee90;
$cell_color: #fff;

table {
	width: 28rem;
	height: 28rem;
	border-collapse: collapse;
	border-spacing: 0;
}

td {
	margin: 0;
	padding: 0;
	width: calc(100% / 9);
	height: calc(100% / 9);
	text-align: center;
	font-size: 2rem;
	background-color: $cell_color;
	border: 1.5px solid $cell_border_color;
	outline: none;
}

.cell.border-right {
	border-right: $board_border solid $board_border_color;
}

.cell.border-bottom {
	border-bottom: $board_border solid $board_border_color;
}

.cell.isActive {
	background: #add8e6;
}

.cell.isEven {
	background: $even_cell_color;
}

.cell.isDefault {
	font-weight: bold;
	color: #c00;
}

.cell.error {
	background-color: #c00;
	color: #fff;
}

.btn:disabled {
	cursor: not-allowed;
}

.row {
	button {
		margin: 0.25rem;
	}

	display: flex;
	flex-flow: row wrap;
}
</style>
