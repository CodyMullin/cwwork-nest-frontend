<template>
  <div>
    <Navbar />
    <div class="flex justify-between items-center">
      <h4 class="px-4 py-6 text-xl font-semibold">
        Estimates
      </h4>
      <button
        class="mx-4 my-6 px-4 py-1 rounded-lg bg-green-400 text-sm text-gray-100 focus:outline-none"
        v-on:click="toggleModal()"
      >
        Add Room
      </button>
    </div>
    <h4 class="px-4 py-6 text-xl font-semibold">
      {{ this.estimate.customerName }} - {{ this.estimate.id }}
    </h4>

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
            <h3 class="text-2xl font-semibold">
              Add A Room
            </h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="toggleModal()"
            >
              ×
            </button>
          </div>
          <!--body-->
          <div
            class="relative px-6 py-3 flex-auto items-center justify-between"
          >
            <div>
              <div class="pb-6">
                <div class="flex">
                  Estimate ID:
                  <div>{{ this.estimateId }}</div>
                </div>
                <label>Room Name</label>
                <input type="text" class="w-full h-12 border border-gray-400" />
              </div>
            </div>
            <div class="flex" v-for="(job, index) in jobs" :key="index">
              <div class="flex flex-col w-1/2">
                <label>Material</label>
                <input
                  type="text"
                  list="materials"
                  class="h-12 border-gray-400 border mr-3"
                  placeholder="Material"
                  v-model="jobs.materialName"
                  :name="`jobs[${index}][materialName]`"
                />
                <datalist id="materials">
                  <option v-for="material in materials" :key="material.id">
                    {{ material.name }}
                  </option>
                </datalist>
              </div>
              <div class="flex flex-col w-1/4">
                <label>Size</label>
                <input
                  type="text"
                  class="h-12 border-gray-400 border mr-3"
                  v-model="jobs.roomSize"
                  :name="`jobs[${index}][roomSize]`"
                />
              </div>
              <div class="flex flex-col w-1/4">
                <label>Add</label>
                <button
                  class="bg-green-500 w-full h-12 text-white rounded-sm px-3"
                  v-on:click="addJob"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
          >
            <button
              class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all .15s ease"
              v-on:click="toggleModal()"
            >
              Cancel
            </button>
            <button
              class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all .15s ease"
              v-on:click="toggleModal()"
            >
              Save Changes
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
      jobs: [
        {
          materialName: "",
          roomSize: "",
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
        roomSize: "",
      });
    },
  },
};
</script>
