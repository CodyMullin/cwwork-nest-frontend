<template>
  <div>
    <Navbar />
    <form class="px-6" @submit.prevent="createCustomer">
      <div class="flex justify-between items-center">
        <h4 class="py-6 text-xl font-semibold">Add New Customer</h4>
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
      <div class="pt-8">
        <label class="text-lg">Notes</label>
        <textarea
          class="w-full border border-gray-700 h-48 rounded-md px-3 pt-2 placeholder-gray-200 mt-3"
          placeholder="Notes"
          v-model="notes"
        />
      </div>
      <div class="pt-8">
        <label class="text-lg">Email</label>
        <input
          type="text"
          class="w-full border border-gray-700 h-10 rounded-md px-3 placeholder-gray-200 mt-3"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="pt-8">
        <label class="text-lg">Phone Number</label>
        <input
          type="text"
          class="w-full border border-gray-700 h-10 rounded-md px-3 placeholder-gray-200 mt-3"
          placeholder="Phone Number"
          v-model="phoneNumber"
        />
      </div>
      <div class="pt-8">
        <label class="text-lg">Address</label>
        <input
          type="text"
          class="w-full border border-gray-700 h-10 rounded-md px-3 placeholder-gray-200 mt-3"
          placeholder="Address"
          v-model="address"
        />
      </div>
      <div class="pt-8">
        <label class="text-lg">Reference</label>
        <select
          class="w-full border border-gray-700 h-10 rounded-md px-3 placeholder-gray-200 mt-3 focus:outline-none"
          placeholder="Reference"
          v-model="reference"
        >
          <option value="" disabled selected>
            Reference
          </option>
          <option value="google">Google</option>
          <option value="yelp">Yelp</option>
          <option value="f&f">Friend/Family</option>
          <option value="website">Website</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="pt-8">
        <label class="text-lg">Preference</label>
        <div class="flex items-center">
          <div>
            <label class="pr-2">Email</label>
            <input
              type="radio"
              name="preference"
              id="email"
              value="email"
              v-model="preference"
            />
          </div>
          <div class="px-3">
            <label class="pr-2">Call</label>
            <input
              type="radio"
              name="preference"
              id="call"
              value="call"
              v-model="preference"
            />
          </div>
          <div class="px-3">
            <label class="pr-2">Text</label>
            <input
              type="radio"
              name="preference"
              id="text"
              value="text"
              v-model="preference"
            />
          </div>
        </div>
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
      name: "",
      notes: "",
      email: "",
      address: "",
      phoneNumber: "",
      reference: "",
      preference: "",
      accessToken: localStorage.accessToken,
    };
  },
  methods: {
    createCustomer() {
      let customer = {
        name: this.name,
        notes: this.notes,
        email: this.email,
        address: this.address,
        phoneNumber: this.phoneNumber,
        reference: this.reference,
        preference: this.preference,
      };
      this.__submitToServer(customer);
    },
    __submitToServer(data) {
      //   console.log(data);
      axios
        .post(`${server.baseURL}customers`, data, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
        .then(() => {
          router.push({ name: "Customers" });
        });
    },
  },
};
</script>
