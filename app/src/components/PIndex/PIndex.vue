<template>
	<div>
		<router-link :to="{ name: 'solve', params: { puzzle: puzzle } }">
			Solve {{ puzzle }}
			<button type="button" class="nes-btn">Solve</button>
		</router-link>
		<br />
		<br />
		<router-link :to="{ name: 'edit', params: { puzzle: puzzle } }">
			Edit {{ puzzle }}
		</router-link>
	</div>
</template>

<script>
export default {
	name: "PIndex",
	data() {
		return {
			puzzle: "1oeoeeoe3ooeo6eooeee3oo1oeee7o1oeeoeoe8eeo5oooeooe3e4oeoo8oo6oeoooe1eeeo6eeeoooo7",
		}
	},
}
</script>
