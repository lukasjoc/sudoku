<template>
	<div>editing {{ puzzleURL }}</div>
</template>

<script>
export default {
	name: "PEdit",
	computed: {
		puzzleURL() {
			return this.$route.params.puzzle
		},
	},
}
</script>
