import { AuthAPI } from "./api/authAPI";

export default ({ app: { $axios, store } }, inject) => {
  const authAPI = $axios.create({
    headers: {
      Authorization: `Bearer ${store.state.authentication.token}`,
    },
  });

  authAPI.setBaseURL(process.env.SERVER);

  const authentication = new AuthAPI(authAPI, store);

  // inject the service, making it available in the context, component, store, etc.

  inject("authAPI", authentication);
};
