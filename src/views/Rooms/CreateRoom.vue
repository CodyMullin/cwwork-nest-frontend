<template>
  <div>
    <Navbar />
    <div class="px-4 flex justify-between items-center">
      <h4 class="py-6 text-xl font-semibold">Add New Estimate</h4>
      <button
        class="my-6 h-8 w-24 rounded-lg bg-green-400 text-sm text-gray-100 focus:outline-none"
      >
        Save
      </button>
    </div>
    <div class="flex flex-col w-1/2">
      <label>Material</label>
      <select
        type="text"
        list="materials"
        class="h-12 border-gray-400 border mr-3 px-3"
        placeholder="Material"
        @change="getMaterialCost(materialName)"
        v-model="materialName"
      >
        <option v-for="material in materials" :key="material.id">
          {{ material.id }}
        </option>
      </select>
    </div>
    <div class="flex flex-col w-1/4">
      <label>Area</label>
      <input
        type="text"
        class="h-12 border-gray-400 border mr-1 px-3"
        v-model="roomArea"
      />
    </div>
    <div class="px-4">
      <label>Price</label>
      <div class="pt-3">${{ materialCost * roomArea }}</div>
    </div>
    <div class="flex flex-col w-1/8 ml-3">
      <label>Remove</label>
      <button
        class="bg-red-500 w-full h-12 text-white rounded-sm px-3"
        v-on:click="removeJob(index)"
      >
        x
      </button>
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
      materials: [],
      materialName: "",
      materialCost: "1",
      roomArea: "",
      jobCost: "",
      jobs: [{}],
      accessToken: localStorage.accessToken,
    };
  },
  created() {
    this.fetchMaterials();
  },
  methods: {
    fetchMaterials() {
      axios
        .get(`${server.baseURL}materials`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((data) => (this.materials = data.data));
    },
    getMaterialCost(id) {
      axios
        .get(`${server.baseURL}materials/${id}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        // .then((data) => console.log(data.data.salesCost));
        .then((data) => (this.materialCost = data.data.salesCost));
    },
  },
};
</script>
