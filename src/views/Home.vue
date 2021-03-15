<template>
  <div class="bg-gray-200 w-full h-screen text-center">
    <div class=" flex w-full items-center justify-center h-screen">
      <form @submit.prevent="signin()">
        <div>
          <input
            type="text"
            id="username"
            v-model="username"
            class="h-12 w-64 border-gray-100 px-2 rounded-md bg-gray-50"
            placeholder="Enter Username"
          />
        </div>
        <div>
          <input
            type="text"
            id="password"
            v-model="password"
            class="h-12 w-64 border-gray-100 px-2 rounded-md bg-gray-50 mt-3"
            placeholder="Enter Password"
          />
        </div>
        <button
          type="submit"
          class="mt-6 bg-blue-500 text-white w-32 h-12 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../helper";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    signin() {
      let loginInfo = {
        username: this.username,
        password: this.password,
      };
      this.__submitToServer(loginInfo);
    },
    __submitToServer(data) {
      axios
        .post(`${server.baseURL}auth/signin`, data)
        .then((data) => this.$store.commit("setToken", data.data.accessToken))
        .then(() =>
          localStorage.setItem("accessToken", this.$store.state.accessToken)
        );
      this.$router.push("/dashboard");
    },
    signout() {
      this.$store.commit("removeToken", "");
    },
  },
};
</script>
