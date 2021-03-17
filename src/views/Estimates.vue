<template>
  <div>
    <Navbar />
    <div class="flex justify-between items-center">
      <h4 class="px-4 py-6 text-xl font-semibold">Estimates</h4>
      <router-link to="/estimate/create">
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
      <div v-for="estimate in estimates.data" :key="estimate.id">
        <router-link :to="`/estimates/${estimate.id}`">
          <a>
            <div class="flex items-center justify-between py-4">
              <div class="mx-4">
                <div class="font-semibold text-lg">
                  {{ estimate.customerName }}
                </div>
              </div>
              <div
                v-if="estimate.status === 'PENDING'"
                class="bg-yellow-300 px-3 py-1 text-white rounded-md"
              >
                {{ estimate.status }}
              </div>
              <div
                v-if="estimate.status === 'ACCEPTED'"
                class="bg-green-300 px-3 py-1 text-white rounded-md"
              >
                {{ estimate.status }}
              </div>
              <div
                v-if="estimate.status === 'REJECTED'"
                class="bg-red-300 px-3 py-1 text-white rounded-md"
              >
                {{ estimate.status }}
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
      estimates: [],
      accessToken: localStorage.accessToken,
    };
  },
  created() {
    this.fetchEstimates();
  },
  methods: {
    fetchEstimates() {
      axios
        .get(`${server.baseURL}estimates`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        // .then((data) => console.log(data));
        .then((data) => (this.estimates = data));
    },
  },
};
</script>
