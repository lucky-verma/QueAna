// import AuthApi from "../../api/auth/authApi";
import { clearLoginDetailsFromLocalStorage } from "../../utils/localStorage";
import jsonwebtoken from "jsonwebtoken";

export default {
  async nuxtServerInit({ dispatch }) {},

  async updateLoginAndTokenFromLocalStorage(data) {
    console.log(this.$cookies);
    const details = jsonwebtoken.decode(this.$cookies.get("access_token"));
    data.commit("SET_TOKEN_FROM_COOKIE");

    if (details) {
      try {
        // get whole customer details
        let response = await this.$authAPI.getUser({
          user_id: details.user_id,
        });
        console.log("Options", response.data);

        // set the details only if the token is logged in, i.e. customer is not null
        if (response.data) {
          console.log("Setting", response.data.user._id);
          let customer = response.data;
          console.log(customer, "This DAT");
          data.commit("SET_LOGIN", true);
          data.commit("SET_ID", response.data.user._id);
          data.commit("SET_FULL_NAME", response.data.user.full_name);
          data.commit("SET_EMAIL", response.data.user.username);
          // data.commit(
          //   "SET_EMAIL",
          //   customer.email !== undefined ? customer.email : ""
          // );
        } else {
          data.commit("SET_LOGIN", false);
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    } else {
      data.dispatch("resetLoginCredentials");
      return false;
    }
  },

  setResponse(data, payload) {
    console.log("Patmern", payload);
    data.commit("SET_RESPONSES", payload.responses);
  },
};
