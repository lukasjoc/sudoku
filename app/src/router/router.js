import { createRouter, createWebHistory } from "vue-router"
import PIndex from "@/components/PIndex/PIndex.vue"

const routes = [
	{
		path: "/",
		name: "index",
		component: PIndex,
	},
	{
		path: "/solve/:puzzle",
		name: "solve",
		component: () => import(/* webpackchunkname: "solve" */ "@/components/PSolve/PSolve.vue"),
	},
	{
		path: "/edit/:puzzle",
		name: "edit",
		component: () => import(/* webpackchunkname: "edit" */ "@/components/PEdit/PEdit.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
