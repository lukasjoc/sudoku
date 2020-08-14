import Index from "../views/Index.vue"
import { RouteConfigs } from '@/@types/shims-router'

const routes: RouteConfigs = [
  {
    path: "/",
    alias: "/index",
    name: "Index",
    component: Index
  },
  {
    path: "/edit",
    name: "Edit",
    component: () => import(/* webpackChunkName: "edit" */ "../views/Edit.vue")
  },
  {
    path: "/solve",
    name: "Solve",
    component: () => import(/* webpackChunkName: "solve" */ "../views/Solve.vue")
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
  }
]

export default routes