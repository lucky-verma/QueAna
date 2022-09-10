import { convertToSearchParams } from "~/utils/ApiUtils";

export class AuthAPI {
  constructor(axios, store) {
    this.$axios = axios;
    this.store = store;
    this.OnError();
  }
  OnError() {
    this.$axios.onError((error) => {
      console.log(error.response);
      const code = parseInt(error.response && error.response.status);
      console.log(code);
      //aunthentication error, please sign in to continue
      if (code === 401) {
        // Redirect to login page as user is unauthorized.
        // Implement to all classes
      }
    });
  }
  getGuestToken(params) {
    return this.$axios.post("/api/v1/token/generate", params, {
      headers: {
        // 'Authorization': `Bearer ${store.state.loginManagement.token}`
      },
    });
  }

  login(payload) {
    return this.$axios.post("/auth/login", payload, {
      headers: {
        // Authorization: `Bearer ${this.store.state.authentication.token}`,
      },
    });
  }

  signup(payload) {
    return this.$axios.post("/auth/signup/", payload, {
      headers: {},
    });
  }

  logout(payload) {
    return this.$axios.post("/api/v1/client/customer/logout", payload, {
      headers: {
        Authorization: `Bearer ${this.store.state.loginManagement.token}`,
      },
    });
  }
  updateCustomer(params, payload) {
    return this.$axios.patch(
      `/api/v1/client/customer/account/user?${convertToSearchParams(params)}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.store.state.loginManagement.token}`,
        },
      }
    );
  }
  getUser(params) {
    return this.$axios.get(
      `/auth/user_info/?${convertToSearchParams(params)}`,
      {
        headers: {
          Authorization: `Bearer ${this.store.state.authentication.token}`,
        },
      }
    );
  }
  generateOtpForMobileUpdate(payload) {
    return this.$axios.post(
      `/api/v1/client/customer/mobile-update/generate-otp`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.store.state.loginManagement.token}`,
        },
      }
    );
  }
  verifyOtpForMobileUpdate(payload) {
    return this.$axios.post(
      `/api/v1/client/customer/mobile-update/verify-otp`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.store.state.loginManagement.token}`,
        },
      }
    );
  }
}
