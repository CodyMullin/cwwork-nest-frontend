<template>
  <div>
    <Navbar />
    <div>This is the dashboard page</div>
    <div>
      {{ this.estimates.data.length }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import { server } from '../helper'
export default {
  components: { Navbar },
  data() {
    return {
      estimates: [],
      accessToken: localStorage.accessToken,
    }
  },
  created() {
    this.fetchEstimates()
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
        .then((data) => (this.estimates = data))
    },
  },
}
</script>
