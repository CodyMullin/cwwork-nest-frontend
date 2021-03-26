import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";

import Materials from "../views/Materials.vue";
import Material from "../views/Materials/Material.vue";
import MaterialUpdate from "../views/Materials/MaterialUpdate.vue";
import CreateMaterial from "../views/Materials/CreateMaterial.vue";

import Category from "../views/Categories.vue";
import CategoryId from "../views/Categories/Category.vue";
import CreateCategory from "../views/Categories/CreateCategory.vue";

import Customers from "../views/Customers.vue";
import CustomerId from "../views/Customers/Customer.vue";
import CreateCustomer from "../views/Customers/CreateCustomer.vue";

import Estimates from "../views/Estimates.vue";
import EstimateId from "../views/Estimates/Estimate.vue";
import CreateEstimate from "../views/Estimates/CreateEstimate.vue";

import CreateRoom from "../views/Rooms/CreateRoom.vue";

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
  {
    path: "/material/create",
    name: "CreateMaterial",
    component: CreateMaterial,
  },
  {
    path: "/category",
    name: "Categories",
    component: Category,
  },
  {
    path: "/categories/:id",
    name: "Category",
    component: CategoryId,
  },
  {
    path: "/category/create",
    name: "CreateCategory",
    component: CreateCategory,
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customers,
  },
  {
    path: "/customers/:id",
    name: "Customer",
    component: CustomerId,
  },
  {
    path: "/customer/create",
    name: "CreateCustomer",
    component: CreateCustomer,
  },
  {
    path: "/estimates",
    name: "Estimates",
    component: Estimates,
  },
  {
    path: "/estimates/:id",
    name: "Estimate",
    component: EstimateId,
  },
  {
    path: "/estimate/create",
    name: "CreateEstimate",
    component: CreateEstimate,
  },
  {
    path: "/:id/createRoom",
    name: "CreateRoom",
    component: CreateRoom,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
