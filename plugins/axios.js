import { AuthAPI } from "./api/authAPI";
import { ExamAPI } from "./api/examAPI";

export default ({ app: { $axios, store } }, inject) => {
  const authAPI = $axios.create({
    headers: {
      Authorization: `Bearer ${store.state.authentication.token}`,
    },
  });
  const examAPI = $axios.create({
    headers: {
      Authorization: `Bearer ${store.state.authentication.token}`,
    },
  });

  authAPI.setBaseURL(process.env.SERVER);
  examAPI.setBaseURL(process.env.SERVER);

  const authentication = new AuthAPI(authAPI, store);
  const exam = new ExamAPI(authAPI, store);

  // inject the service, making it available in the context, component, store, etc.

  inject("authAPI", authentication);
  inject("examAPI", exam);
};
