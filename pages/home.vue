<template>
  <p>Hi, {{ authentication.full_name }}, You are logged in bruh</p>
</template>
<script>
import Login from "../components/Login.vue";
import { mapState } from "vuex";

export default {
  name: "IndexPage",
  computed: {
    ...mapState(["authentication"]),
  },

  middleware: ["isAuthenticated"],

  components: {
    Login,
  },
};
</script>
