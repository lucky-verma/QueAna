import { convertToSearchParams } from "~/utils/ApiUtils";

export class ExamAPI {
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
  getExamlist(params) {
    return this.$axios.get("/exam/schedule", params, {
      headers: {
        Authorization: `Bearer ${this.store.state.authentication.token}`,
      },
    });
  }

  getExamById(params) {
    return this.$axios.get("/exam/info/" + params, {
      headers: {
        Authorization: `Bearer ${this.store.state.authentication.token}`,
      },
    });
  }
  getBehaviour(params) {
    return this.$axios.get(
      "/behaviour/fetch?" + convertToSearchParams(params),
      {
        headers: {
          Authorization: `Bearer ${this.store.state.authentication.token}`,
        },
      }
    );
  }
  getCurrentQuestion(params) {
    return this.$axios.get(
      "/question/get_user_question?" + convertToSearchParams(params),
      {
        headers: {
          Authorization: `Bearer ${this.store.state.authentication.token}`,
        },
      }
    );
  }

  createReflection(body) {
    return this.$axios.post(`/behaviour/create`, body, {
      headers: {
        Authorization: `Bearer ${this.store.state.authentication.token}`,
      },
    });
  }
  updateBehaviour(body) {
    return this.$axios.patch(`/behaviour/update`, body, {
      headers: {
        Authorization: `Bearer ${this.store.state.authentication.token}`,
      },
    });
  }
  createResponse(body) {
    return this.$axios.post(`/response/create`, body, {
      headers: {
        Authorization: `Bearer ${this.store.state.authentication.token}`,
      },
    });
  }
}
