<template>
  <div>
    <div>Solving: {{ currentPuzzle }}</div>
  </div>
</template>

<script>
export default {
  name: "Index",
  computed: {
    currentPuzzle() {
      return this.$router.params;
    }
  }
};
</script>
