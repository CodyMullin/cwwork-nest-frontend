<template>
  <div>
    <Navbar />
    <div class="flex justify-between items-center">
      <h4 class="px-4 py-6 text-xl font-semibold">Categories</h4>
      <router-link to="/category/create">
        <a>
          <button
            class="mx-4 my-6 px-4 py-1 rounded-lg bg-green-400 text-sm text-gray-100 focus:outline-none"
          >
            Add New
          </button>
        </a>
      </router-link>
    </div>

    <div class="px-4">
      <input
        type="text"
        class="w-full border border-gray-900 px-3 py-2 text-sm font-semibold placeholder-gray-200 placeholder-opacity-100 border-opacity-25 rounded-md"
        placeholder="Search"
      />
    </div>

    <div class="py-6 px-4">
      <div v-for="category in categories.data" :key="category.id">
        <router-link :to="`/categories/${category.id}`">
          <a>
            <div class="flex items-center justify-between py-4">
              <div class="mx-4">
                <div class="font-semibold text-lg">{{ category.name }}</div>
              </div>
              <div class="px-3 py-1 text-gray-900">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
            <hr />
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import { server } from "../helper";
export default {
  components: { Navbar },
  data() {
    return {
      categories: [],
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
        // .then((data) => console.log(data));
        .then((data) => (this.categories = data));
    },
  },
};
</script>
