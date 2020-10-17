import { createApp } from "vue"
import store from "./store"
import router from "./router"

import SDefault from "@/components/SDefault/SDefault.vue"

const app = createApp(SDefault)
app.use(store)
app.use(router)
app.mount("#app")
