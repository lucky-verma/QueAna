/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default {
  SET_ID(state, id) {
    state.id = id;
  },
  SET_TOKEN(state, token) {
    state.token = token;
    this.$cookies.set("access_token", token, {
      path: "/",
      maxAge: 120 * 60,
    });
    // localStorage.setItem('token', token)
  },
  SET_LOGIN(state, value) {
    state.isLogin = value;

    this.$cookies.set("isLogin", value, {
      path: "/",
      maxAge: 60 * 60,
    });
    // localStorage.setItem('isLogin', value)
  },
  SET_FULL_NAME(state, value) {
    state.full_name = value;
  },
  SET_EMAIL(state, value) {
    state.email = value;
  },
  SET_MOBILE(state, value) {
    state.mobile = value;
  },
  SET_GST_NUMBER(state, value) {
    state.gst_number = value;
  },
  SET_CITY(state, value) {
    state.city = value;
  },
  SET_STATE(state, value) {
    state.state = value;
  },
  SET_VENDOR_STATUS(state, value) {
    state.vendor_status = value;
  },
  SET_PIN_CODE(state, value) {
    state.pin_code = value;
  },
  SET_ACCOUNT_TYPE(state, value) {
    state.account_type = value;
  },
  SET_ADDRESS_ID(state, value) {
    state.address_id = value;
  },
  SET_COMPANY_NAME(state, value) {
    state.company_name = value;
  },
  RESET_PROFILE_DETAILS(state) {
    state.id = "";
    state.first_name = "";
    state.last_name = "";
    state.email = "";
    state.mobile = "";
    state.profile_image = "";
  },
  SET_TOKEN_FROM_COOKIE(state) {
    state.token = this.$cookies.get("access_token");
  },
  SET_LOGIN_FROM_LOCAL_STORAGE(state) {
    state.isLogin = this.$cookies.get("isLogin");
  },
};
