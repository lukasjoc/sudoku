<template>
	<div>
	<div class="grid-sudoku">
		<div v-for="row in sudokudata" class="grid-row">
			<div v-for="cell in row" class="grid-cell">		
				<input type="text" :key="cell.num" :value="cell.value" :class="{isEven: coloreven}" class="grid-cell-editor"  maxsize="1" />
				</div>
	</div>
		</div>
	</div>
	</div>
</template>

<script>
	module.exports = {
		data: ()  => {
			return {	
		
		 sudokudata: [
			
			// this is row based know think about that

			[
				{"value": 2, "isEven": false}, {"value": 2, "isEven": false}, {"value": 2, "isEven": false},
				{"value": 2, "isEven": false}, {"value": 4, "isEven": false}, {"value": 2, "isEven": false},
				{"value": 2, "isEven": false}, {"value": 2, "isEven": false}, {"value": 3, "isEven": false},
			],

			[
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
			],

			[
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": true},  {"value": 1, "isEven": true}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false}
			],

			[
				{"value": 2, "isEven": false}, {"value": 2, "isEven": false}, {"value": 2, "isEven": false},
				{"value": 2, "isEven": false}, {"value": 2, "isEven": false}, {"value": 2, "isEven": false},
				{"value": 2, "isEven": false}, {"value": 2, "isEven": false}, {"value": 2, "isEven": false},
			],

			[
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
			],

			[
				{"value": 1, "isEven": false}, {"value": 1, "isEven": true}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false}
			],


			[
				{"value": 2, "isEven": false}, {"value": 2, "isEven": false}, {"value": 2, "isEven": false},
				{"value": 2, "isEven": false}, {"value": 2, "isEven": false}, {"value": 2, "isEven": false},
				{"value": 2, "isEven": false}, {"value": 2, "isEven": false}, {"value": 2, "isEven": false},
			],

			[
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
			],

			[
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false},
				{"value": 1, "isEven": false}, {"value": 1, "isEven": false}, {"value": 1, "isEven": false}
			], **/

			]
	}
	}
}
</script>

<style>

input:focus {
	outline: none;
}

.grid-sudoku {
  display: table;
  background: white;
  border:  1px solid black;
}


.grid-cell {
	display: table-cell;
	padding: 10px;
  border: 1px solid gray;
}

.grid-cell-editor {
	border: none;
  width: 20px;
  height: 20px;
  font-family: 'Dosis', sans-serif;
  font-weight: bold;
  text-align: center;
  font-size: 18px;
	transition: all ease 1.0s;
}

.coloreven {
	background-color: #a7ff9d;
}

</style>

