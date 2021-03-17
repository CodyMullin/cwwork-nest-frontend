<template>
  <div>
    <Navbar />
    <div class="flex justify-between items-center">
      <h4 class="px-4 py-6 text-xl font-semibold">
        {{ this.customer.name }}
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
      <div class="text-lg font-semibold">Notes</div>
      <div class="text-sm font-medium">{{ this.customer.notes }}</div>
    </div>
    <div class="px-3 pt-6 flex items-center justify-between">
      <div class="w-1/2">
        <div class="text-lg font-semibold">Phone Number</div>
        <div class="text-sm font-medium">
          {{ this.customer.phoneNumber }}
        </div>
      </div>
      <div class="w-1/2">
        <div class="text-lg font-semibold">Email Address</div>
        <div class="text-sm font-medium">{{ this.customer.email }}</div>
      </div>
    </div>
    <div class="px-3 pt-6 flex items-center justify-between">
      <div class="w-1/2">
        <div class="text-lg font-semibold">Way Discovered</div>
        <div class="text-sm font-medium">
          {{ this.customer.reference }}
        </div>
      </div>
      <div class="w-1/2">
        <div class="text-lg font-semibold">Communication Preference</div>
        <div class="text-sm font-medium">
          {{ this.customer.preference }}
        </div>
      </div>
    </div>
    <div class="px-3 pt-6">
      <div class="text-lg font-semibold">Address</div>
      <div class="text-sm font-medium">{{ this.customer.address }}</div>
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
      customer: {},
      customerId: 0,
      accessToken: localStorage.accessToken,
    };
  },
  created() {
    this.customerId = this.$route.params.id;
    this.fetchCustomer();
  },
  methods: {
    fetchCustomer() {
      axios
        .get(`${server.baseURL}customers/${this.customerId}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        // .then((data) => console.log(data));
        .then((data) => (this.customer = data.data));
    },
  },
};
</script>
