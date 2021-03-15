import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Materials from "../views/Materials.vue";
import Material from "../views/singleItem/Material.vue";
import MaterialUpdate from "../views/singleItem/MaterialUpdate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/materials",
    name: "Materials",
    component: Materials,
  },
  {
    path: "/materials/:id",
    name: "Material",
    component: Material,
  },
  {
    path: "/materials/:id/update",
    name: "MaterialUpdate",
    component: MaterialUpdate,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
