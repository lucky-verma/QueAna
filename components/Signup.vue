<!-- Please remove this file from your project -->
<template>
  <div class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card px-5 py-5" id="form1">
          <h2>Signup Form</h2>

          <div class="form-data" v-if="!submitted">
            <div class="forms-inputs mb-4">
              <span>Full Name </span>
              <input
                autocomplete="off"
                type="text"
                v-model="full_name"
                v-bind:class="{
                  'form-control': true,
                  // 'is-invalid': !validEmail(username) && emailBlured,
                }"
                v-on:blur="emailBlured = true"
              />
              <div class="invalid-feedback">A valid username is required!</div>
            </div>
            <div class="forms-inputs mb-4">
              <span>Email</span>
              <input
                autocomplete="off"
                type="text"
                v-model="username"
                v-bind:class="{
                  'form-control': true,
                  // 'is-invalid': !validEmail(username) && emailBlured,
                }"
                v-on:blur="emailBlured = true"
              />
              <div class="invalid-feedback">A valid username is required!</div>
            </div>

            <div class="forms-inputs mb-4">
              <span>Password</span>
              <input
                autocomplete="off"
                type="password"
                v-model="password"
                v-bind:class="{
                  'form-control': true,
                  // 'is-invalid': !validPassword(password) && passwordBlured,
                }"
                v-on:blur="passwordBlured = true"
              />
              <div class="invalid-feedback">Password must be 8 character!</div>
            </div>
            <p style="color: blue" @click="$router.push('/login')">Sign in</p>
            <div class="mb-3">
              <button
                v-on:click.stop.prevent="submitForm"
                class="btn btn-dark w-100"
              >
                Sign up
              </button>
            </div>
          </div>
          <div class="success-data" v-else>
            <div class="text-center d-flex flex-column">
              <i class="bx bxs-badge-check"></i>
              <span class="text-center fs-1"
                >You have been logged in <br />
                Successfully</span
              >
            </div>
          </div>
          <div v-if="errorText" style="color: red">{{ errorText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["isAuthenticated", "checkInformation"],
  methods: {
    async submitForm() {
      if (!this.full_name) {
        this.errorText = "password is invalid";
        return;
      }
      if (!this.username) {
        this.errorText = "username is invalid";

        return;
      }
      if (!this.password) {
        this.errorText = "password is invalid";
        return;
      }

      try {
        await this.$store.dispatch("authentication/signup", {
          full_name: this.full_name,
          username: this.username,
          password: this.password,
        });
        this.$router.push("/home");
      } catch (error) {
        if (error.response.data) {
          if (error.response.data.errorMessage) {
            this.errorText = error.response.data.errorMessage;
            console.log(this.errorText, "error ext");
            return;
          }
        }
      }
    },
  },
  data() {
    return {
      password: "",
      username: "",
      full_name: "",
      submitted: "",
      errorText: "",
    };
  },
};
</script>
