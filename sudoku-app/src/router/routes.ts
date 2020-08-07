import { RouteConfig } from "vue-router"
import Index from "../views/Index.vue"

const routes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/index",
    name: "Index",
    component: Index
  },
  {
    path: "/edit/:puzzle",
    name: "Edit",
    component: () => import(/* webpackChunkName: "edit" */ "../views/Edit.vue")
  },
  {
    path: "/solve/:puzzle",
    name: "Solve",
    component: () => import(/* webpackChunkName: "solve" */ "../views/Solve.vue")
  }
]

export default routes