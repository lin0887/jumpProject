import { createRouter, createWebHistory } from "vue-router";
import index from "../components/Index.vue";



let history = createWebHistory();
let routes = [
  {
    path: "/",
    name: "Index",
    component: index,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("../components/Login.vue"),
  //   meta: {
  //     requiresAuth: false
  //   }
  // },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/rank",
    name: "Rank",
    component: () => import("../components/Rank.vue"),
    meta: {
      requiresAuth: true
    }
  },
];

export default createRouter({ history, routes });
