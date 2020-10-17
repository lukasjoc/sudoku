<template>
	<div>Solving {{ puzzleURL }}</div>
</template>

<script>
export default {
	name: "PSolve",
	computed: {
		puzzleURL() {
			return this.$route.params.puzzle
		},
	},
}
</script>
