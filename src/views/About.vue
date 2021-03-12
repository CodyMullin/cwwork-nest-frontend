<template>
  <div>
    <div>
      Login
    </div>
    <form @submit.prevent="signin()">
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter Username"
        />
      </div>
      <div>
        <label for="psername">Password</label>
        <input
          type="text"
          id="password"
          v-model="password"
          placeholder="Enter Password"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    {{ $store.state.accessToken }}
    <button @click="signout()">Log Out</button>
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
    },
    signout() {
      this.$store.commit("removeToken", "");
    },
  },
};
</script>
