import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: () => import("../views/transactions/Index")
  },
  {
    path: "/transactions/create",
    name: "TransactionCreate",
    component: () => import("../views/transactions/Add")
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () => import("../views/Calendar")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
