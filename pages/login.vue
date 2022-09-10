<template>
  <Login />
</template>
<script>
import Login from "../components/Login.vue";

export default {
  name: "IndexPage",
  middleware: ["redirectAuthenticated"],

  components: {
    Login,
  },
};
</script>
