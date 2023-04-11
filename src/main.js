import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/main.js";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// router.beforeEach((to, from, next) => {
//   const baseURL = "http://localhost:8000";
//   next()
//   if (to.meta.requiresAuth) {
//     const api = `${baseURL}/check`;
//     fetch(api, {
//       method: "GET",
//       headers: {
//         Authorization: `bearer ${localStorage.getItem("token")}`,
//       },
//     }).then((response) => {
//       if (response.ok) {
//         next();
//       } else {
//         next({
//           path: "/login",
//         });
//       }
//     });
//   } else {
//     next();
//   }
// });


const app = createApp(App)
app.use(router)
app.use(VueSweetalert2);
app.mount("#app");
