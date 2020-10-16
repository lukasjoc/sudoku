import { createApp } from "vue";
import SDefault from "@/components/SDefault/SDefault.vue";
import router from "./router/router";
import store from "./store";

const app = createApp(SDefault);
app.use(store);
app.use(router);
app.mount("#app");
