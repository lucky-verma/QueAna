<template>
  <Signup />
</template>
<script>
import Signup from "../components/Signup.vue";

export default {
  name: "IndexPage",
  middleware: ["redirectAuthenticated"],

  components: {
    Signup,
  },
};
</script>
<style>
body {
  background-color: #0a69ed;
}
</style>
