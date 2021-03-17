<template>
  <div>
    <Navbar />
    <div class="flex justify-between items-center">
      <h4 class="px-4 py-6 text-xl font-semibold">
        {{ this.estimate.customerName }}
      </h4>
      <!-- <router-link to={`/customer/edit/${data.customers[0].id}`}> -->
      <a>
        <button
          class="mx-4 my-6 px-4 py-1 rounded-lg bg-green-400 text-sm text-gray-100 focus:outline-none"
        >
          Edit
        </button>
      </a>
      <!-- </router-link> -->
    </div>
    <div class="px-3">
      <div class="text-sm font-medium">{{ this.estimate.id }}</div>
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
      estimate: {},
      estimateId: 0,
      accessToken: localStorage.accessToken,
    };
  },
  created() {
    this.estimateId = this.$route.params.id;
    this.fetchEstimate();
  },
  methods: {
    fetchEstimate() {
      axios
        .get(`${server.baseURL}estimates/${this.estimateId}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        // .then((data) => console.log(data));
        .then((data) => (this.estimate = data.data));
    },
  },
};
</script>
