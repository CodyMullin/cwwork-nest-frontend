<template>
  <div>
    <Navbar />
    <div class="flex justify-between items-center">
      <h4 class="px-4 py-6 text-xl font-semibold">
        Estimates
      </h4>
      <router-link :to="`/${estimateId}/createroom`">
        <a>
          <button
            class="mx-4 my-6 px-4 py-1 rounded-lg bg-green-400 text-sm text-gray-100 focus:outline-none"
          >
            Add Room
          </button>
        </a>
      </router-link>
    </div>
    <h4 class="px-4 py-6 text-xl font-semibold">
      {{ this.estimate.customerName }} - {{ this.estimate.id }}
    </h4>

    <div class="px-4 flex justify-between items-center">
      <button class="w-1/2 text-white rounded-md mx-2 py-4 bg-green-500">
        Approve
      </button>
      <button class="w-1/2 text-white rounded-md mx-2 py-4 bg-red-500">
        Rejected
      </button>
    </div>

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t"
          >
            <div>
              <h3 class="text-2xl font-semibold">
                Add A Room
              </h3>
            </div>
            <div class="flex items-center">
              <div class="pt-1 px-4">${{ this.roomCost }}</div>
              <button
                class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                v-on:click="toggleModal()"
              >
                ×
              </button>
            </div>
          </div>
          <!--body-->
          <div
            class="relative px-6 py-3 flex-auto items-center justify-between"
          >
            <div>
              <div class="">
                <label>Room Name</label>
                <input
                  type="text"
                  class="w-full h-12 border border-gray-400 px-3"
                />
              </div>
            </div>
            <div class="flex pt-6" v-for="(job, index) in jobs" :key="index">
              <div class="flex flex-col w-1/2">
                <label>Material</label>
                <select
                  type="text"
                  list="materials"
                  class="h-12 border-gray-400 border mr-3 px-3"
                  placeholder="Material"
                  @change="getMaterialCost(job.materialName)"
                  v-model="job.materialName"
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
                  v-model="job.roomArea"
                />
              </div>
              <div class="px-4">
                <label>Price</label>
                <div class="pt-3">${{ job.materialCost }}</div>
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
            <div class="flex flex-col w-1/4 pt-8">
              <label>Add</label>
              <button
                class="bg-green-500 w-full h-12 text-white rounded-sm px-3"
                v-on:click="addJob"
              >
                +
              </button>
            </div>
          </div>

          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
          >
            {{ jobs }}
            <button
              class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all .15s ease"
              v-on:click="toggleModal()"
            >
              Cancel
            </button>
            <button
              class="text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all .15s ease"
              v-on:click="toggleModal()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
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
      materials: [],
      roomCost: "0.00",
      jobs: [
        {
          materialName: "",
          materialCost: 0,
          roomArea: "",
          jobCost: "",
        },
      ],
      estimateId: 0,
      accessToken: localStorage.accessToken,
      showModal: false,
    };
  },
  created() {
    this.estimateId = this.$route.params.id;
    this.fetchEstimate();
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
        // .then((data) => console.log(data));
        .then((data) => (this.materials = data.data));
    },
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
    toggleModal: function() {
      this.showModal = !this.showModal;
    },
    addJob() {
      this.jobs.push({
        materialName: "",
        materialCost: 0,
        roomArea: "",
        jobCost: "",
      });
    },
    removeJob(index) {
      this.jobs.splice(index, 1);
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
