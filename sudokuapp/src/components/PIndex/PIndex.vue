<template>
  <router-link :to="{ name: 'solve', params: { puzzle: puzzle } }"
    >Solve</router-link
  >
  <router-link :to="{ name: 'edit', params: { puzzle: puzzle } }"
    >Edit</router-link
  >
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      puzzle:
        "1oeoeeoe3ooeo6eooeee3oo1oeee7o1oeeoeoe8eeo5oooeooe3e4oeoo8oo6oeoooe1eeeo6eeeoooo7"
    };
  }
};
</script>
