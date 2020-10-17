import { createStore } from "vuex"
import Vue from "vue"

// import solve from "./modules/solve"
// import edit from "./modules/edit"

export default createStore({
	state: () => {
		unsolved: []
		solved: []
	},
	getters: {
		// check if puzzle is complete
		isComplete(state, puzzleString, puzzleData) {
			if (state.solve[puzzleString] === puzzleData) return true
			return false
		},
		// checks if we have the puzzle unsolved in the state
		hasPuzzleUnsolved(state, puzzleString) {
			if (state.unsolved[puzzleString]) return true
			return false
		},
		// checks if we have the puzzle solved in the state
		hasPuzzleSolved(state, puzzleString) {
			if (state.solved[puzzleString]) return true
			return false
		},
	},
	actions: {
		// get solution by puzzleString
		async getSolution({ commit }, puzzleString) {
			try {
				let solved = await Vue.axios(`/solve/${puzzleString}`)
				commit("updateSolved", puzzleString, solved.data)
			} catch (e) {
				console.error(e)
			}
		},

		// get puzzle by puzzleString (unsolved just data structure)
		async getPuzzle({ commit }, puzzleString) {
			try {
				let unsolved = await Vue.axios(`/parse/${puzzleString}`)
				commit("updateUnsolved", puzzleString, unsolved.data)
			} catch (e) {
				console.error(e)
			}
		},

		// TODO: in edit we call getPuzzle with new  valid puzzleString
		// and then we call syncStates after we checked with the hasPuzzleUnsolved that the
		// new puzzle is there with old puzzleString
	},
	mutations: {
		// if strings are edited  remove olds ones from both states and
		// add new ones to unsolved..
		syncStates(state, puzzleString) {
			if (state.solved[puzzleString]) delete state.solved[puzzleString]
			if (state.unsolved[puzzleString]) delete state.unsolved[puzzleString]
		},

		// update solved state
		updateSolved(state, puzzleString, solved) {
			state.solved[puzzleString] = solved
		},

		// update unsolved state
		updateUnsolved(state, puzzleString, unsolved) {
			state.unsolved[puzzleString] = unsolved
		},
	},
})
