<template>
  <div>
    <Navbar />
    <div class="flex justify-between items-center">
      <h4 class="px-4 py-6 text-xl font-semibold">Materials</h4>
      <div class="flex justify-between items-center">
        <h4 class="px-4 py-6 text-xl font-semibold">
          {{ this.material.name }}
        </h4>
        <router-link :to="`/materials/${material.id}/update`">
          <a>
            <button
              class="mx-4 my-6 px-4 py-1 rounded-lg bg-green-400 text-sm text-gray-100 focus:outline-none"
            >
              Edit
            </button>
          </a>
        </router-link>
      </div>

      <p class="pt-3 mx-4 text-sm">{{ this.materials }}</p>

      <div class="mx-4 pt-8">
        <div class="flex items-center justify-between text-lg py-4">
          <span>Category</span>
          <span>{{ this.material.category }}</span>
        </div>
        <hr />
        <div class="flex items-center justify-between text-lg py-4">
          <span>Sales Cost</span>
          <span>
            ${{ this.material.salesCost }}/{{ this.material.measurement }}
          </span>
        </div>
        <hr />
        <div class="flex items-center justify-between text-lg py-4">
          <span>Installation Cost</span>
          <span>
            ${{ this.material.installCost }}/{{ this.material.measurement }}
          </span>
        </div>
        <hr />

        <div class="flex items-center justify-between text-lg py-4">
          <span>Purchase Cost</span>
          <span>${{ this.material.purchaseCost }}</span>
        </div>
        <hr />
      </div>

      <h4 class="px-4 pt-8 text-lg font-semibold">Work Done History</h4>

      <div class="mx-4 pt-2">
        <div class="flex items-center justify-between text-lg py-4">
          <span>Project ID</span>
          <span>Customer Name</span>
        </div>
        <hr />
        <div class="flex items-center justify-between text-lg py-4">
          <span>Project ID</span>
          <span>Customer Name</span>
        </div>
        <hr />
        <div class="flex items-center justify-between text-lg py-4">
          <span>Project ID</span>
          <span>Customer Name</span>
        </div>
        <hr />
        <div class="flex items-center justify-between text-lg py-4">
          <span>Project ID</span>
          <span>Customer Name</span>
        </div>
        <hr />
        <div class="flex items-center justify-between text-lg py-4">
          <span>Project ID</span>
          <span>Customer Name</span>
        </div>
        <hr />
        <div class="flex items-center justify-between text-lg py-4">
          <span>Project ID</span>
          <span>Customer Name</span>
        </div>
        <hr />
        <div class="flex items-center justify-between text-lg py-4">
          <span>Project ID</span>
          <span>Customer Name</span>
        </div>
        <hr />
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
      material: {},
      materialId: 0,
      accessToken: localStorage.accessToken,
    };
  },
  created() {
    this.materialId = this.$route.params.id;
    this.fetchMaterials();
  },
  methods: {
    fetchMaterials() {
      axios
        .get(`${server.baseURL}materials/${this.materialId}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        // .then((data) => console.log(data));
        .then((data) => (this.material = data.data));
    },
  },
};
</script>
