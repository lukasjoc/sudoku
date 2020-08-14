<template>
  <div class="notfound">
    <h1>404- Page Not Found</h1>
    <router-link :to="{path: '/'}">
      <button type="button">Get Back</button>
    </router-link>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { changePageTitle } from "../assets/ts/shared";
export default Vue.extend({
  beforeCreate() {
    changePageTitle(`404 Page Not Found`);
  },
});
</script>