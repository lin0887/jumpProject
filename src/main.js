import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/main.js";

router.beforeEach((to, from, next) => {
  const baseURL = "http://localhost:8000";
  console.log("導航守衛啟動");
  if (to.meta.requiresAuth) {
    const api = `${baseURL}/check`;
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.ok) {
        next();
      } else {
        next({
          path: "/login",
        });
      }
    });
  } else {
    next();
  }
});

createApp(App).use(router).mount("#app");
