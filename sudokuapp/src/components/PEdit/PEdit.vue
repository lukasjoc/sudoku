<template>
  <div>Editing {{ currentPuzzle }}</div>
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
