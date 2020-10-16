import Vue from "vue"
import Router, { RouteConfig } from "vue-router"
import Routes from "./routes"

Vue.use(Router)
const routes: Array<RouteConfig> = Routes
const router: Router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
