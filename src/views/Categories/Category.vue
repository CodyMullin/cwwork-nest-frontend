<template>
  <div>
    <Navbar />
    <div>
      <div class="flex justify-between items-center">
        <h4 class="px-4 py-6 text-xl font-semibold">
          {{ this.category.name }}
        </h4>
        <router-link :to="`/categories/${category.id}/update`">
          <a>
            <button
              class="mx-4 my-6 px-4 py-1 rounded-lg bg-green-400 text-sm text-gray-100 focus:outline-none"
            >
              Edit
            </button>
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../../components/Navbar.vue";
import { server } from "../../helper";
export default {
  components: { Navbar },
  data() {
    return {
      category: {},
      categoryId: 0,
      accessToken: localStorage.accessToken,
    };
  },
  created() {
    this.categoryId = this.$route.params.id;
    this.fetchCategory();
  },
  methods: {
    fetchCategory() {
      axios
        .get(`${server.baseURL}category/${this.categoryId}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        // .then((data) => console.log(data));
        .then((data) => (this.category = data.data));
    },
  },
};
</script>
