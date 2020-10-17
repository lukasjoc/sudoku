import { createApp } from "vue"
import store from "./store/store.js"
import router from "./router/router.js"
import SDefault from "@/components/SDefault/SDefault.vue"
import axios from "axios"
import VueAxios from "vue-axios"

// import "nes.css/css/nes.min.css"

const app = createApp(SDefault)

app.use(axios, {
	baseURL: "localhost:5050",
})

app.use(store)

app.use(router)

app.mount("#app")
