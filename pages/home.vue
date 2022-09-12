<template>
  <main class="main">
    <div
      class="row"
      style="background-color: white; padding: 20px; border: 2px black solid"
    >
      <div class="col-md-11">
        <h3>Upcoming Task Schedule</h3>
      </div>
      <div class="col-md-1">
        <button class="btn btn-primary" @click.prevent="submitForm">
          Logout
        </button>
      </div>

      <!-- <h6>Hello,{{ authentication.full_name }}</h6> -->
    </div>
    <!-- <p>This is not</p> -->
    <section class="event-summary">
      <table class="events-table">
        <thead class="events-table__headings">
          <tr class="events-table__row">
            <th class="events-table__heading">Date</th>
            <th
              class="events-table__heading events-table__heading--description"
            >
              Description
            </th>
            <!-- <th class="events-table__heading">Exam Start</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="exam in examList"
            :key="exam._id"
            class="events-table__row members-event"
          >
            <td
              class="events-table__cell events-table__cell--date"
              data-label="Date"
            >
              <span> {{ fetchDay(exam.start_time) }}</span>
              {{ fetchMonth(exam.start_time) }}
              {{ fetchYear(exam.start_time) }} at
              <b> {{ fetchTime(exam.start_time) }}</b>
            </td>
            <td
              class="events-table__cell events-table__cell--description"
              data-label="Description"
            >
              <h3 class="member-event__heading">
                {{ exam.name }}
              </h3>
              <p class="members-event__summary">
                {{ exam.data_summary }}
              </p>
              <p class="events-event__type">
                Note : A 'start' button will appear once the time for exam is
                been reached. Please click on it to proceed with the test. All
                the best folks!
              </p>
            </td>
            <td class="events-table__cell" data-label="Availability">
              <button
                class="event__cta"
                title="Book Programme Now"
                @click="
                  createLog(
                    'Start',
                    'clicked on start from home page',
                    exam._id
                  ),
                    $router.push('/exam?exam_id=' + exam._id + '&question_no=1')
                "
              >
                Start
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
<script>
import Login from "../components/Login.vue";
import { mapState } from "vuex";
import DataStream from "jws/lib/data-stream";

export default {
  data() {
    return {
      examList: [],
    };
  },
  name: "IndexPage",
  computed: {
    ...mapState(["authentication"]),
  },

  middleware: ["isAuthenticated"],

  components: {
    Login,
  },
  methods: {
    async submitForm() {
      console.log("Logout flow complete");
      await this.$store.dispatch("authentication/logout");
      // window.reload();
      this.$router.push("/login");
    },
    async createLog(type, action, exam_id = null, question_id = null) {
      let logBody = {
        exam_id: exam_id,
        question_id: question_id,
        type: type,
        action: action,
        field_name: "",
        field_value: "",
        answer_id: null,
        page: this.$route.path,
      };

      const generateLog = await this.$examAPI.createLog(logBody);
    },
    async fetchExamList() {
      try {
        const examList = await this.$examAPI.getExamlist();
        this.examList = examList.data.exam;
      } catch (error) {}
    },
    fetchDay(object) {
      console.log(object);
      return new Date(object).getDate();
    },
    fetchMonth(object) {
      return new Date(object).toLocaleString("default", { month: "long" });
    },
    fetchYear(object) {
      return new Date(object).getFullYear();
    },
    fetchTime(object) {
      return new Date(object).toLocaleTimeString("en-US");
    },
  },
  async created() {
    await this.fetchExamList();
  },
};
</script>

<style>
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  position: relative;
  background-image: url("https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?cs=srgb&dl=pexels-fwstudio-129731.jpg&fm=jpg");
  background-size: cover;
}
.header {
  font-size: 2rem;
  text-align: center;
}
.header__heading {
  color: #fff;
}
.main {
  margin: auto;
  padding: 15px;
  max-width: 1100px;
}
.events-table {
  background-color: #fff;
  border: none;
  border-spacing: 0;
}
@media screen and (min-width: 600px) {
  .events-table {
    margin: 0;
    padding: 0;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }
}
.events-table__headings {
  display: none;
  color: #fff;
  background-color: #34495e;
}
@media screen and (min-width: 600px) {
  .events-table__headings {
    display: table-header-group;
    background-color: color(navBlue);
  }
}
.events-table__row {
  display: block;
  padding: 20px 0 10px;
  border: 0;
  border-bottom: 1px solid #bdc3c7;
}
@media screen and (min-width: 600px) {
  .events-table__row {
    display: table-row;
    padding: 5px;
  }
}
.events-table__row:after {
  content: "";
  clear: both;
  display: table;
}
.events-table__row:before {
  display: block;
}
.events-table__cell {
  clear: left;
  display: block;
  float: left;
  padding: 20px 10px;
  border: 0;
}
@media screen and (min-width: 600px) {
  .events-table__cell {
    text-align: center;
  }
}
.events-table__cell:before {
  content: attr(data-label) ":";
  display: block;
  float: left;
  margin-right: 15px;
  font-weight: bold;
  text-transform: uppercase;
}
@media screen and (min-width: 600px) {
  .events-table__cell:before {
    display: none;
  }
}
@media screen and (min-width: 600px) {
  .events-table__cell--date {
    width: 14%;
  }
  .events-table__cell--date span {
    margin-bottom: 3px;
    font-size: 2.1rem;
    display: block;
  }
}
.events-table__cell--description:before {
  float: none;
  margin-bottom: 20px;
}
@media screen and (min-width: 600px) {
  .events-table__cell--description {
    text-align: left;
  }
}
@media screen and (min-width: 600px) {
  .events-table__heading,
  .events-table__cell {
    display: table-cell;
    float: none;
    clear: none;
  }
}
@media screen and (min-width: 600px) {
  .events-table__heading {
    padding: 20px;
    text-align: center;
    text-transform: uppercase;
    background-color: color(navBlue);
    border: 0;
  }
  .events-table__heading--description {
    padding-left: 10px;
    text-align: left;
  }
}
.event__cta {
  position: relative;
  bottom: 10px;
  display: block;
  padding: 10px;
  width: 120px;
  overflow: hidden;
  color: #34495e;
  text-align: center;
  text-decoration: none;
  border: 1px solid #34495e;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.event__cta:hover {
  color: #fff;
  background-color: #34495e;
}
</style>
