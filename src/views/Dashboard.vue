<template>
  <div>
    <Navbar />
    <div>This is the dashboard page</div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      accessToken: localStorage.accessToken,
    };
  },
};
</script>
