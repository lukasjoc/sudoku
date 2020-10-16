import { createRouter, createWebHistory } from "vue-router";
import PIndex from "@/components/PIndex/PIndex.vue";

const routes = [
  {
    path: "/",
    alias: "/puzzles",
    name: "PIndex",
    component: PIndex
  },
  {
    path: "/edit/:puzzle",
    name: "edit",
    component: () =>
      import(/* webpackChunkName: "edit" */ "@/components/PEdit/PEdit.vue")
  },
  {
    path: "/solve/:puzzle",
    name: "solve",
    component: () =>
      import(/* webpackChunkName: "solve" */ "@/components/PSolve/PSolve.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
