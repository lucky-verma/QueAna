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

  login(data, payload) {
    return new Promise((resolve, reject) => {
      let that = this;
      this.$authAPI
        .login(payload)
        .then(async function (response) {
          console.log("Thisdaslkdasjklasj");
          if ((response.data, "Token")) {
            console.log(response.data);
            data.commit("SET_TOKEN", response.data.token);
            data.commit("SET_FULL_NAME", response.data.full_name);
            data.commit("SET_EMAIL", response.data.username);
            data.commit("SET_LOGIN", true);
            const details = jsonwebtoken.decode(response.data.token);
            // console.log(details);
            //Setting ID and Mobile number of the customer
            data.commit("SET_ID", details.user_id);
          }
          resolve(response);
        })
        .catch(function (error) {
          data.commit("SET_LOGIN", false);
          console.log(error);

          reject(error);
        });
    });
  },
  signup(data, payload) {
    return new Promise((resolve, reject) => {
      let that = this;
      this.$authAPI
        .signup(payload)
        .then(async function (response) {
          if (response.data) {
            data.commit("SET_TOKEN", response.data.token);
            data.commit("SET_LOGIN", true);
            data.commit("SET_FULL_NAME", response.data.full_name);
            data.commit("SET_EMAIL", response.data.username);
            const details = jsonwebtoken.decode(response.data.token);
            console.log(details);
            //Setting ID and Mobile number of the customer
            data.commit("SET_ID", details.user_id);
          }
          resolve(response);
        })
        .catch(function (error) {
          data.commit("SET_LOGIN", false);
          console.log(error);

          reject(error);
        });
    });
  },
  setMobile(data, mobile) {
    data.commit("SET_MOBILE", mobile);
  },

  resetLoginCredentials(data) {
    data.commit("SET_TOKEN", undefined);
    data.commit("SET_LOGIN", false);
    data.commit("SET_FULL_NAME", "");
    data.commit("SET_EMAIL", "");
    data.commit("RESET_PROFILE_DETAILS", false);
  },

  logout(data, payload) {
    let that = this;

    return new Promise((resolve, reject) => {
      this.$authAPI
        .logout(payload)
        .then(function (response) {
          if (response.data.isSuccess) {
            data.commit("SET_TOKEN", response.data.body.token);
            data.commit("SET_LOGIN", false);
            data.commit("RESET_PROFILE_DETAILS", false);
          }
          that.$cookies.remove("access_token");

          that.$cookies.remove("isLogin");
          // sessionStorage.clear()
          resolve(response.data);
        })
        .catch(function (error) {
          that.$cookies.remove("access_token");

          that.$cookies.remove("isLogin");
          reject(error);
        });
    });
  },
  updateProfilePicture(data, payload) {
    data.commit("SET_PROFILE_IMAGE", payload);
  },
};
