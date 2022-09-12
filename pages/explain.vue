<template>
  <div id="wrapper">
    <div id="display-container" style="margin-top: 50px">
      <h2 class="pop">Explanations</h2>
      <p>Click on the below Questions to view.</p>

      <ul class="nav nav-tabs mb-3">
        <li
          class="nav-item"
          @click="
            (question_no = question.question_no),
              createLog(
                'Page Jump',
                `Page changed`,
                null,
                'question_no',
                question.question_no
              ),
              $router.push(
                '/explain?exam_id=' +
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
      <div class="header">
        <div class="number-of-count">
          <span class="number-of-question pop">
            Total Correct : {{ total_correct }}/
            {{ examDetails.total_questions }} Question</span
          >
        </div>
        <div class="number-of-count">
          <span class="number-of-question pop">
            {{ question.question_no }} of
            {{ examDetails.total_questions }} Question</span
          >
        </div>
      </div>
      <div id="container">
        <div class="row" v-if="loaded" style="pointer-events: none">
          <div class="col-md-12">
            <p class="pop">Problem Statement :</p>
          </div>
          <div class="col-md-12">
            <p class="" v-html="question.question"></p>
          </div>
          <div class="col-md-12">
            <p class="pop">Explaination :</p>
          </div>
          <div class="col-md-12">
            <p class="" v-html="explain"></p>
          </div>
          <div class="col-md-12" v-if="question.image">
            <img :src="generateImage(question.image)" alt="" />
          </div>
          <div :class="optionClass('A')" @click="selectedOption('A')">
            <div class="col-md-12">
              <p>Option : {{ option1.option }}</p>
            </div>
            <div class="col-md-12">{{ option1.answer }}</div>
            <div class="col-md-12">
              <img
                v-if="option1.image"
                style="max-width: 300px"
                :src="option1.image"
                alt=""
              />
            </div>
          </div>
          <div :class="optionClass('B')" @click="selectedOption('B')">
            <div class="col-md-12">
              <p>Option : {{ option2.option }}</p>
            </div>
            <div class="col-md-12">{{ option2.answer }}</div>
            <div class="col-md-12">
              <img
                v-if="option2.image"
                style="max-width: 300px"
                :src="option1.image"
                alt=""
              />
            </div>
          </div>
          <div :class="optionClass('C')" @click="selectedOption('C')">
            <div class="col-md-12">
              <p>Option : {{ option3.option }}</p>
            </div>
            <div class="col-md-12">{{ option3.answer }}</div>
            <div class="col-md-12">
              <img
                v-if="option3.image"
                style="max-width: 300px"
                :src="option3.image"
                alt=""
              />
            </div>
          </div>
          <div :class="optionClass('D')" @click="selectedOption('D')">
            <div class="col-md-12">
              <p>Option : {{ option4.option }}</p>
            </div>
            <div class="col-md-12">{{ option4.answer }}</div>
            <div class="col-md-12">
              <img
                v-if="option4.image"
                style="max-width: 300px"
                :src="option4.image"
                alt=""
              />
            </div>
          </div>
          <div class="col-md-12 mt-3 pop">
            <p v-if="correct_option == selected_option" style="color: green">
              Selected Option : {{ selected_option }}
            </p>
            <p v-else style="color: red">
              Selected Option : {{ selected_option }}
            </p>
            <p style="color: green">correct Option : {{ correct_option }}</p>
          </div>
        </div>
        <div class="row" disabled style="pointer-events: none">
          <div class="col-md-12 mt-3 pop"><p>Your confidence level</p></div>
          <div class="col-md-12" style="border: 1px black solid">
            <button
              :class="confidenceClass('1')"
              @click="confidenceChange('1')"
            >
              1
            </button>
            <button
              :class="confidenceClass('2')"
              @click="confidenceChange('2')"
            >
              2
            </button>
            <button
              :class="confidenceClass('3')"
              @click="confidenceChange('3')"
            >
              3
            </button>
            <button
              :class="confidenceClass('4')"
              @click="confidenceChange('4')"
            >
              4
            </button>
            <button
              :class="confidenceClass('5')"
              @click="confidenceChange('5')"
            >
              5
            </button>
          </div>
        </div>

        <div class="col-md-12 mt-3" style="pointer-events: none">
          <label for="" class="form-control-label">Comments </label>
          <textarea
            class="form-control"
            type="text"
            rows="5"
            disabled
            v-model="comment"
            placeholder="Type your reflection here…
"
          ></textarea>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-10">
          <button
            class="btn btn-primary"
            @click="$router.push('/final?exam_id=' + $route.query.exam_id)"
          >
            Fill Post-Reflection
          </button>
        </div>
      </div>
    </div>

    <!-- FIXED SEARCH BOX -->
  </div>
</template>

<script>
// import { timeStamp } from "console";
import { mapState } from "vuex";

export default {
  middleware: "isAuthenticated",

  data() {
    return {
      search: "",
      question: {},
      question_no: "",
      answer_id: "",
      comment: "",
      exam_id: "",
      loaded: false,
      option1: {},
      option2: {},
      option3: {},
      question_list: [],
      explain: "",
      correct_option: null,
      total_correct: 0,

      option4: {},
      examDetails: {},
      selected_option: null,
      confidence: null,
    };
  },
  watch: {
    async question_no() {
      console.log("Cange");
      this.resetData();

      await this.preFetchData();
      await this.fetchQuestion();
      await this.validateQuestions();

      // await this.fetchExam();
    },
  },
  computed: {
    ...mapState(["examination"]),
  },

  methods: {
    async validateQuestions() {
      const validationSteop = await this.$examAPI.getQuestionWiseReport({
        exam_id: this.$route.query.exam_id,
      });

      let listData = validationSteop.data.body;
      this.total_correct = 0;
      for (let index = 0; index < listData.length; index++) {
        const element = listData[index];
        this.question_list.push({
          complete: element.correct,
          question_no: element.question_no,
        });
        if (element.correct) {
          this.total_correct += 1;
        }
      }

      // this.submitButtonDisabled
    },

    async createLog(
      type,
      action,
      answer_id = null,
      form_field = null,
      form_value = null
    ) {
      let logBody = {
        exam_id: this.$route.query.exam_id,
        question_id: this.question._id,
        type: type,
        answer_id: answer_id,
        field_value: form_value,
        field_name: form_field,
        action: action,
        page: this.$route.path,
      };

      const generateLog = await this.$examAPI.createLog(logBody);
    },
    confidenceChange(confidence) {
      this.confidence = confidence;
    },
    confidenceClass(option) {
      // console.log(option, "aa");
      let classOption = "btn btn-scale btn-scale-desc-1";
      if (this.confidence == option) {
        classOption += " chosen";
      } else {
      }
      return classOption;
    },
    optionClass(option) {
      let classOption = "col-md-6 option-div pop";
      if (this.selected_option == option && option == this.correct_option) {
        classOption += " correct";
        return classOption;
        // console.log("option", option);
      }
      if (this.selected_option == option) {
        classOption += " incorrect";
      }
      if (option == this.correct_option) {
        classOption += " correct";
      }

      return classOption;
    },
    selectedOption(option) {
      this.selected_option = option;

      if (this.option1.option == option) {
        this.answer_id = this.option1.answer_id;
      } else if (this.option2.option == option) {
        this.answer_id = this.option2.answer_id;
      } else if (this.option3.option == option) {
        this.answer_id = this.option3.answer_id;
      } else if (this.option4.option == option) {
        this.answer_id = this.option4.answer_id;
      }

      //Log
      this.createLog(
        "Click",
        `Selected option`,
        this.answer_id,
        "answer",
        option
      );
    },

    generateImage(image) {
      return "http://localhost:3000/" + image;
    },
    async fetchQuestion() {
      try {
        const fetchQuestion =
          await this.$examAPI.getCurrentQuestionExplaination({
            exam_id: this.$route.query.exam_id,
            question_no: this.question_no,
          });
        this.question = fetchQuestion.data.question;
        const fetchAnswer = await this.$examAPI.getUserResponse({
          exam_id: this.$route.query.exam_id,
          question_id: this.question._id,
        });
        if (fetchAnswer.data.response.length == 0) {
          return;
        }
        this.answer_id = fetchAnswer.data.response[0].answer_id;
        this.comment = fetchAnswer.data.response[0].comment;
        this.confidence = fetchAnswer.data.response[0].confidence;
        this.explain = fetchAnswer.data.response[0].question.explain;

        for (let index = 0; index < this.question.answers.length; index++) {
          const element = this.question.answers[index];

          if (element.option == "A") {
            this.option1 = {
              answer: element.answer,
              image: this.generateImage(element.image),
              option: element.option,
              answer_id: element._id,
            };
            if (element.is_correct) {
              this.correct_option = element.option;
            }

            if (this.option1.answer_id == this.answer_id) {
              this.selected_option = "A";
            }
          } else if (element.option == "B") {
            this.option2 = {
              answer: element.answer,
              image: this.generateImage(element.image),
              option: element.option,
              answer_id: element._id,
            };
            if (element.is_correct) {
              this.correct_option = element.option;
            }

            if (this.option2.answer_id == this.answer_id) {
              this.selected_option = "B";
            }
          } else if (element.option == "C") {
            this.option3 = {
              answer: element.answer,
              image: this.generateImage(element.image),
              option: element.option,
              answer_id: element._id,
            };
            if (element.is_correct) {
              this.correct_option = element.option;
            }

            if (this.option3.answer_id == this.answer_id) {
              this.selected_option = "C";
            }
          } else if (element.option == "D") {
            this.option4 = {
              answer: element.answer,
              image: this.generateImage(element.image),
              option: element.option,
              answer_id: element._id,
            };
            if (element.is_correct) {
              this.correct_option = element.option;
            }

            if (this.option4.answer_id == this.answer_id) {
              this.selected_option = "D";
            }
          }
        }

        this.loaded = true;
      } catch (error) {
        if (error.response.data) {
          if (error.response.data.message == "Reflection Required") {
            this.$router.push(
              "/pre_reflection?exam_id=" + this.$route.query.exam_id
            );
            return;
          }
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

    resetData() {
      this.question_list = [];
      this.selected_option = null;
      this.comment = null;
      this.search = null;
      this.confidence = null;
    },

    async preFetchData() {
      let responses = this.examination.responses.slice();

      let exists = false;
      for (let index = 0; index < responses.length; index++) {
        const element = responses[index];
        if (element.question_no == this.question_no) {
          this.answer_id = element.answer_id;
          this.confidence = element.confidence;
          this.comment = element.comment;
        }
      }
    },
  },
  mounted() {
    console.log("Started Exam");
    if (!this.$route.query.exam_id) {
      this.$router.push("/home");
    }
    this.question_no = parseInt(this.$route.query.question_no);
    // console.log(this.que/)
    this.exam_id = this.$route.query.exam_id;
    // this.fetchQuestion();
    this.fetchExam();
    // this.validateQuestions();
  },
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
  -webkit-tap-highlight-color: transparent;
}
label {
  font-family: "Poppins", sans-serif;
}
.pop {
  font-family: "Poppins", sans-serif;
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
.incomplete {
  background: #ff9999 !important;
  border: 1px solid #ff0000 !important;
  border-radius: 5px !important;
  cursor: pointer;
  transition: all 0.3s ease;
}

.complete {
  background: #b3ffb3 !important;
  border: 1px solid #009900 !important;
  border-radius: 5px !important;
  cursor: pointer;
  transition: all 0.3s ease;
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
.nav-tabs {
  border-bottom: 0px;
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
.option-div:hover {
  cursor: pointer;
}
.chosen {
  background: aliceblue !important;
  border: 1px solid #84c5fe !important;
  border-radius: 5px !important;

  cursor: pointer;
  transition: all 0.3s ease;
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
button {
  font-size: 1em;
  background-color: #0a69ed;
  color: #ffffff;
  padding: 0.7em 1.8em;
  border-radius: 0.3em;
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
.incorrect {
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
