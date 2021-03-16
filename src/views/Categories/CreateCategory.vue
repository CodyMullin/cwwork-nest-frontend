<template>
  <div>
    <Navbar />
    <form class="px-6" @submit.prevent="createCategory">
      <div class="flex justify-between items-center">
        <h4 class="py-6 text-xl font-semibold">Add New Category</h4>
        <button
          class="my-6 h-8 w-24 rounded-lg bg-green-400 text-sm text-gray-100 focus:outline-none"
        >
          Save
        </button>
      </div>
      <div>
        <label class="text-lg">Name</label>
        <input
          type="text"
          class="w-full border border-gray-700 h-10 rounded-md px-3 placeholder-gray-200 mt-3"
          placeholder="Name"
          v-model="name"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../../components/Navbar.vue";
import { server } from "../../helper";
import router from "../../router";
export default {
  components: { Navbar },
  data() {
    return {
      categories: [],
      name: "",
      accessToken: localStorage.accessToken,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios
        .get(`${server.baseURL}category`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((data) => (this.categories = data.data));
    },
    createCategory() {
      let category = {
        name: this.name,
      };
      this.__submitToServer(category);
    },
    __submitToServer(data) {
      axios
        .post(`${server.baseURL}category`, data, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
        .then(() => {
          router.push({ name: "Categories" });
        });
    },
  },
};
</script>
