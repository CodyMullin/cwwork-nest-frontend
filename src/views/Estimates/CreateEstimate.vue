<template>
  <div>
    <Navbar />
    <form class="px-6" @submit.prevent="createEstimate">
      <div class="flex justify-between items-center">
        <h4 class="py-6 text-xl font-semibold">Add New Estimate</h4>
        <button
          class="my-6 h-8 w-24 rounded-lg bg-green-400 text-sm text-gray-100 focus:outline-none"
        >
          Save
        </button>
      </div>
      <div class="pt-8">
        <label class="text-lg">Customer Name</label>
        <input
          type="text"
          list="customers"
          class="w-full border border-gray-700 h-10
        rounded-md px-3 placeholder-gray-200 mt-3 focus:outline-none"
          placeholder="Customer Name"
          v-model="customerName"
        />
        <datalist id="customers">
          <option value="" disabled selected>
            Type Of Work
          </option>
          <option v-for="customer in customers" :key="customer.id">
            {{ customer.name }}
          </option>
        </datalist>
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
      customers: [],
      customerName: "",
      accessToken: localStorage.accessToken,
    };
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
    fetchCustomers() {
      axios
        .get(`${server.baseURL}customers`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((data) => (this.customers = data.data));
    },
    createEstimate() {
      let estimate = {
        customerName: this.customerName,
      };
      this.__submitToServer(estimate);
    },
    __submitToServer(data) {
      //   console.log(data);
      axios
        .post(`${server.baseURL}estimates`, data, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
        .then(() => {
          router.push({ name: "Estimates" });
        });
    },
  },
};
</script>
