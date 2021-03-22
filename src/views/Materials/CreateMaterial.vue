<template>
  <div>
    <Navbar />
    <form class="px-6" @submit.prevent="createMaterial">
      <div class="flex justify-between items-center">
        <h4 class="py-6 text-xl font-semibold">Add New Items</h4>
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
          class="w-full border border-gray-700 h-10 rounded-md px-3 placeholder-gray-200 mt-3 focus:outline-none focus:ring-2 focus:border-blue-500"
          placeholder="Name"
          v-model="name"
        />
      </div>
      <div class="pt-8">
        <label class="text-lg">Category</label>
        <select
          class="w-full border border-gray-700 h-10 rounded-md px-3 placeholder-gray-200 mt-3 focus:outline-none"
          placeholder="Type Of Work"
          v-model="category"
        >
          <option value="" disabled selected>
            Type Of Work
          </option>

          <option v-for="category in categories" :key="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="pt-8 flex">
        <div class="pr-2">
          <label class="text-lg">Sales Cost</label>
          <input
            type="text"
            class="w-full border border-gray-700 h-10 rounded-md px-3 placeholder-gray-200 mt-3 focus:outline-none focus:ring-2 focus:border-blue-500"
            placeholder="Sales Cost"
            v-model="salesCost"
          />
        </div>
        <div class="pl-2">
          <label class="text-lg">Purchase Cost</label>
          <input
            type="text"
            class="w-full border border-gray-700 h-10 rounded-md px-3 placeholder-gray-200 mt-3 focus:outline-none focus:ring-2 focus:border-blue-500"
            v-model="purchaseCost"
            placeholder="Purchase Cost"
          />
        </div>
      </div>
      <div class="pt-8">
        <label class="text-lg">Installation Cost</label>
        <input
          type="text"
          class="w-full border border-gray-700 h-10 rounded-md px-3 placeholder-gray-200 mt-3 focus:outline-none focus:ring-2 focus:border-blue-500"
          placeholder="Installation Cost"
          v-model="installationCost"
        />
      </div>
      <div class="pt-8">
        <label class="text-lg">Unit Of Measurement</label>
        <div class="flex items-center">
          <div>
            <label class="pr-2">Square Feet</label>
            <input
              type="radio"
              name="measurement"
              id="sqft"
              value="sqft"
              v-model="unitOfMeasurement"
            />
          </div>
          <div class="px-3">
            <label class="pr-2">Cubic Feet</label>
            <input
              type="radio"
              name="measurement"
              id="cubicft"
              value="cubicft"
              v-model="unitOfMeasurement"
            />
          </div>
          <div class="px-3">
            <label class="pr-2">Inch</label>
            <input
              type="radio"
              name="measurement"
              id="inch"
              value="inch"
              v-model="unitOfMeasurement"
            />
          </div>
        </div>
      </div>
      <div class="pt-8">
        <label class="text-lg">Description</label>
        <textarea
          class="w-full border border-gray-700 h-48 rounded-md px-3 pt-2 placeholder-gray-200 mt-3 focus:outline-none focus:ring-2 focus:border-blue-500"
          placeholder="Description"
          v-model="description"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../../components/Navbar.vue'
import { server } from '../../helper'
import router from '../../router'
export default {
  components: { Navbar },
  data() {
    return {
      categories: [],
      name: '',
      category: '',
      salesCost: '',
      purchaseCost: '',
      installationCost: '',
      unitOfMeasurement: '',
      description: '',
      accessToken: localStorage.accessToken,
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    fetchCategories() {
      axios
        .get(`${server.baseURL}category`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((data) => (this.categories = data.data))
    },
    createMaterial() {
      let material = {
        name: this.name,
        description: this.description,
        salesCost: this.salesCost,
        purchaseCost: this.purchaseCost,
        installCost: this.installationCost,
        category: this.category,
        measurement: this.unitOfMeasurement,
      }
      this.__submitToServer(material)
    },
    __submitToServer(data) {
      axios
        .post(`${server.baseURL}materials`, data, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
        .then(() => {
          router.push({ name: 'Materials' })
        })
    },
  },
}
</script>
