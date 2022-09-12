<template>
  <div id="wrapper">
    <div id="display-container" style="margin-top: 50px">
      <h6 class="pop">Questions</h6>
      <p>Click on the below Questions to view or edit.</p>
      <div>
        <!-- <p>Yellow : Incomplete Response , Blue : Completed Response</p> -->
      </div>

      <ul class="nav nav-tabs">
        <li
          class="nav-item"
          @click="
            $router.push(
              '/exam?exam_id=' +
                $route.query.exam_id +
                '&question_no=' +
                question.question_no
            )
          "
          v-for="question in question_list"
          :key="question.question_no"
        >
          <p
            :class="
              question.complete
                ? 'mr-1 nav-link complete'
                : 'mr-1 nav-link incomplete'
            "
          >
            {{ question.question_no }}
          </p>
        </li>
      </ul>
    </div>
    <div id="display-container" style="margin-top: 50px">
      <div class="row">
        <div class="col-md-12">
          <h6>Submit Task?</h6>
          <p>Please click on the submit button below.</p>
          <p style="color: red">{{ errorMessage }}</p>
        </div>

        <div class="col-md-5">
          <button
            class="btn btn-primary"
            style="margin: auto"
            :disabled="submitButtonDisabled"
            @click="submitForm"
          >
            Submit Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { timingSafeEqual } from "crypto";
import { mapState } from "vuex";
export default {
  name: "",
  middleware: ["isAuthenticated"],
  computed: {
    ...mapState(["examination"]),
  },
  data() {
    return {
      show_form: false,
      show_data: true,
      examDetails: {},
      pre_reflection: "",
      submitButtonDisabled: true,
      question_list: [],
      examDetails: "",
      errorMessage: "",
    };
  },
  methods: {
    generateStatus() {
      return "mr-1 nav-link complete";
    },
    async fetchBehaviour() {
      try {
        const behavour = await this.$examAPI.getBehaviour({
          exam_id: this.$route.query.exam_id,
        });
        this.show_form = false;
      } catch (error) {
        if (error.response.data) {
          if (error.response.data.errorMessage == "Refection Required") {
            this.show_data = true;
            return;
          }
          this.show_form = true;
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
      } catch (error) {
        this.errorMessage = "";
        if (error.response.data) {
          if (
            error.response.data.body ==
            "Already submitted response for this question"
          ) {
            this.errorMessage = "Already submitted responses!";
            // this.$router.push(
            //   "/pre_reflection?exam_id=" + this.$route.query.exam_id
            // );
            // return;
          }
        }
      }
    },

    async submitForm() {
      try {
        console.log("This is interesting ", this.examination.responses.length);
        for (
          let index = 0;
          index < this.examination.responses.length;
          index++
        ) {
          const element = this.examination.responses[index];
          console.log("THIs ");
          console.log(element, "Eke");
          // console.log(element,);
          const submitResopnse = await this.$examAPI.createResponse(element);
          console.log(submitResopnse.data, "Response sfrom server");
        }
      } catch (error) {
        this.errorMessage = "";
        if (error.response.data) {
          if (
            error.response.data.body ==
            "Already submitted response for this question"
          ) {
            this.errorMessage = "Already submitted responses!";
            // this.$router.push(
            //   "/pre_reflection?exam_id=" + this.$route.query.exam_id
            // );
            // return;
          }
        }
      }
    },
    async validateQuestions() {
      let validation = false;
      let responses = this.examination.responses;
      let total_questions = parseInt(this.examDetails.total_questions);
      if (total_questions != responses.length) {
        console.log(responses.length, total_questions);

        this.submitButtonDisabled = true;
      }
      let allcompletecount = 0;
      let questionsAppended = [];
      for (let index = 0; index < responses.length; index++) {
        const element = responses[index];
        if (element.answer_id && element.confidence && element.question_no) {
          this.question_list.push({
            complete: true,
            question_no: element.question_no,
          });
          questionsAppended.push(element.question_no);
        } else {
          allcompletecount += 1;
          //This question is incomplete
          this.question_list.push({
            complete: false,
            question_no: element.question_no,
          });
          questionsAppended.push(element.question_no);
        }
      }
      console.log("question", questionsAppended);
      for (let index = 1; index <= total_questions; index++) {
        if (!questionsAppended.includes(index)) {
          this.question_list.push({
            complete: false,
            question_no: index,
          });
        }
      }
      if (allcompletecount == total_questions) {
        validation = true;
      }
      this.question_list = this.question_list.sort(function (a, b) {
        return a.question_no - b.question_no;
      });
      if (this.question_list.length == total_questions) {
        this.submitButtonDisabled = false;
      }
      console.log("Finala Validation", this.question_list);
      return validation;

      // this.submitButtonDisabled
    },
  },
  async mounted() {
    await this.fetchBehaviour();
    await this.fetchExam();
    await this.validateQuestions();
  },
  components: {},
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&amp;display=swap");

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

.incomplete:hover {
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
