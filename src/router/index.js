import { createRouter, createWebHistory } from "vue-router"
import SearchFilterTest from "@/views/SearchFilterTest/index.vue"

const Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/SearchFilterTest",
      name: "SearchFilterTest",
      component: SearchFilterTest,
    },
  ],
})

export default Router
