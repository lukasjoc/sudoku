// Sudoku Parser
class Parser {

	// fromData parses from Array of Arrays of Objects to a simple string representation
	fromData(data: Array<Array<Object>>) {
		let tmpl: String = ""
		for (const x of data) {
			for (const y of x) {
				if (y.value) {
					tmpl += y.value
				} else if (y.isEven) {
					tmpl += 'e'
				} else {
					tmpl += 'o'
				}
			}
		}
		return tmpl
	}

	// fromString parses from string to Array of Arrays of Objects representaton
	fromStr(chars: string) {
		const arr: Array<Object> = []
		for (const ch of chars) {
			const arr_item: Object = {
				"value": (ch === 'e' || ch === 'o') ? '' : ch,
				"isEven": (ch === 'e' || (ch % 2) === 0) ? true : false,
				"isOriginal": (ch === 'e' || ch === 'o') ? false : true
			}
			arr.push(arr_item)
		}
		const res = []
		while (arr.length) res.push(arr.splice(0, 9))
		return res
	}

}

export default Parser