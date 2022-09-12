<template>
  <div id="wrapper">
    <div id="display-container" style="margin-top: 50px">
      <div class="row">
        <div class="col-md-12">
          <h6>Problem Context</h6>
          <p>{{ this.examDetails.problem_context }}</p>
        </div>
        <div class="col-md-12">
          <h6>Data Summary</h6>
          <p>{{ this.examDetails.data_summary }}</p>
        </div>
        <div class="col-md-5">
          <button
            class="btn btn-primary"
            style="margin: auto"
            :disabled="submitButtonDisabled"
            @click="
              $router.push(
                '/exam?exam_id=' + examDetails._id + '&question_no=1'
              )
            "
          >
            Start Task
          </button>
          <p style="margin-top: 10px; color: red" v-if="submitButtonDisabled">
            Please submit your pre-reflection to start task
          </p>
          <p style="margin-top: 10px; color: green" v-if="show_sucess">
            {{ show_sucess }}
          </p>
        </div>
      </div>
    </div>
    <div id="display-container" style="margin-top: 50px" v-if="show_form">
      <div class="row">
        <div class="col-md-12">
          <!-- <h6>Problem Context</h6> -->
          <!-- <p>{{ this.examDetails.problem_context }}</p> -->
        </div>
        <div class="col-md-12 mt-3">
          <label for="" class="form-control-label">Pre Reflection </label>
          <textarea
            class="form-control"
            placeholder="Please, based on problem context and data summary, reflect your understanding
"
            type="text"
            rows="5"
            v-model="pre_reflection"
          ></textarea>
        </div>

        <div class="col-md-5 mt-3">
          <button
            id="next-button"
            style="margin: auto"
            @click.prevent="submitForm"
          >
            Submit Pre-Reflection
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  middleware: ["isAuthenticated"],

  data() {
    return {
      show_form: false,
      show_data: true,
      examDetails: {},
      show_sucess: "",
      pre_reflection: "",
      submitButtonDisabled: true,
    };
  },
  methods: {
    async createLog(type, action, question_id) {
      let logBody = {
        exam_id: this.$route.query.exam_id,
        question_id: question_id,
        type: type,
        action: action,
      };

      const generateLog = await this.$examAPI.createLog(logBody);
    },
    async fetchBehaviour() {
      try {
        const behavour = await this.$examAPI.getBehaviour({
          exam_id: this.$route.query.exam_id,
        });
        this.submitButtonDisabled = false;
        this.show_form = false;
      } catch (error) {
        if (error.response.data) {
          if (error.response.data.errorMessage == "Refection Required") {
            this.show_data = true;

            return;
          }
          this.show_form = true;
          this.submitButtonDisabled = true;
        }
      }
    },
    async fetchExam() {
      try {
        const examDetails = await this.$examAPI.getExamById(
          this.$route.query.exam_id
        );
        if (examDetails.data.exam.length > 0) {
          this.examDetails = examDetails.data.exam[0];
        }
      } catch (error) {}
    },

    async submitForm() {
      try {
        const submitReflection = await this.$examAPI.createReflection({
          exam_id: this.$route.query.exam_id,
          pre_reflection: this.pre_reflection,
        });
        this.submitButtonDisabled = false;
        this.show_sucess =
          "Pre-Reflection has been submitted, you can start your task now!";
        this.show_form = false;
      } catch (error) {}
    },
  },
  mounted() {
    this.fetchBehaviour();
    this.fetchExam();
  },
  components: {},
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&amp;display=swap");

.info {
  position: sticky;
  top: 0px;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  /* font-family: "Poppins", sans-serif; */
  -webkit-tap-highlight-color: transparent;
}
body {
  background-color: #0a69ed;
}
.start-screen,
.score-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button {
  border: none;
  outline: none;
  cursor: pointer;
}
#start-button,
#restart {
  font-size: 1em;
  padding: 0.5em 1.8em;
  border-radius: 0.2em;
}
#restart {
  margin-top: 0.9em;
}
.btn-scale {
  min-width: 44px;
  width: 6%;
  text-align: center;
  font-weight: bold;
  color: black;
  font-family: "Lato", sans-serif;
}
.incomplete {
  background: #ffffb3 !important;
  border: 1px solid #b3b300 !important;
  border-radius: 5px !important;
  cursor: pointer;
  transition: all 0.3s ease;
}

.complete {
  background: #b3d9ff !important;
  border: 1px solid #3399ff !important;
  border-radius: 5px !important;
  cursor: pointer;
  transition: all 0.3s ease;
}
#wrapper {
  position: absolute;
  transform: translateX(-50%);
  top: 20px;
  left: 50%;
  width: 90%;
  max-width: 100.5em;
}
#display-container {
  position: relative;
  background-color: #ffffff;
  padding: 3.1em 1.8em;
  width: 100%;
  margin: 0 auto;
  border-radius: 0.6em;
  box-shadow: 0 20px 45px rgba(0, 24, 56, 0.15);
}
a {
  display: block;
  background-color: #ffffff;
  position: relative;
  margin-top: 1em;
  text-align: center;
  text-decoration: none;
  color: #0a69ed;
  font-size: 1.2em;
  font-weight: 600;
  padding: 1em 0;
  border-radius: 0.4em;
  box-shadow: 0 20px 45px rgba(0, 24, 56, 0.15);
}
.header {
  margin-bottom: 1.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.6em;
  border-bottom: 0.1em solid #c0bfd2;
}
.timer-div {
  background-color: #e1f5fe;
  width: 7.5em;
  border-radius: 1.8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7em 1.8em;
}
.question {
  margin-bottom: 1.25em;
  font-weight: 500;
}
.option-div {
  font-size: 0.9em;
  width: 100%;
  /* max-width: 300px; */
  padding: 1em;
  margin: 0.3em 0;
  text-align: left;
  outline: none;
  background: transparent;
  border: 1px solid #c0bfd2;
  border-radius: 0.3em;
}

.chosen:hover {
  background-color: #add8e6;
  cursor: pointer;
}
.option-div:disabled {
  color: #0b012d;
  cursor: not-allowed;
}
.btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5em;
}
#next-button {
  font-size: 1em;
  background-color: #0a69ed;
  color: #ffffff;
  padding: 0.7em 1.8em;
  border-radius: 0.3em;
}
.hide {
  display: none;
}
.correct {
  background-color: #e7f6d5;
  color: #689f38;
  border-color: #689f38;
}
.inCorrect {
  background-color: #ffdde0;
  color: #d32f2f;
  border-color: #d32f2f;
}
#user-score {
  font-size: 1.5em;
  color: #ffffff;
}
i.fab {
  color: #ff0000;
}
@media screen and (max-width: 600px) {
  body {
    font-size: 12px;
  }
}
</style>
