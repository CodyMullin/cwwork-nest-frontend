<template>
  <div>
    <div>
      <nav class="flex bg-gray-900 h-12 items-center px-4">
        <button v-on:click="activateMenu()">
          <svg
            class="w-8 h-8 text-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
      <div v-if="isActive" class="h-screen w-screen bg-gray-900">
        <ul class="flex flex-col w-full items-center justify-center">
          <router-link
            to="/dashboard"
            class="py-6 text-white text-xl font-semibold w-full text-center hover:bg-gray-800"
          >
            <li>
              <div>Home</div>
            </li>
          </router-link>
          <router-link
            to="/estimates"
            class="py-6 text-white text-xl font-semibold w-full text-center hover:bg-gray-800"
          >
            <li>
              <div>Estimates</div>
            </li>
          </router-link>
          <router-link
            to="/materials"
            class="py-6 text-white text-xl font-semibold w-full text-center hover:bg-gray-800"
          >
            <li>
              <div>Materials</div>
            </li>
          </router-link>
          <router-link
            to="/categories"
            class="py-6 text-white text-xl font-semibold w-full text-center hover:bg-gray-800"
          >
            <li>
              <div>Categories</div>
            </li>
          </router-link>
          <router-link
            to="/customers"
            class="py-6 text-white text-xl font-semibold w-full text-center hover:bg-gray-800"
          >
            <li>
              <div>Customers</div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    activateMenu() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
