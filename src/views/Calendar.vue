<template>
  <div class="white">
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-dialog
              v-model="dialog"
              width="600"
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mr-4"
                  @click="addActivity"
                  color="deep-purple white--text"
                  elevation="4"
                >
                  Add Event
                </v-btn>
              </template>

              <v-card>
                <v-card-title> Add Event </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-select
                          :items="names"
                          label="Activity*"
                          required
                          v-model="newName"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          :items="colors"
                          label="Color*"
                          required
                          color="colors"
                          v-model="newColor"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="newStart"
                              label="Start*"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="newStart"
                            :allowed-dates="allowedDates"
                            class="mt-4"
                            min="2016-06-15"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="newEnd"
                              label="End*"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="newEnd"
                            :allowed-dates="allowedDates"
                            class="mt-4"
                            min="2016-06-15"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="green darken-1" text @click="addEvent">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          >
          </v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import db from "@/firebase/firebase";
export default {
  data: () => ({
    startDate: "",
    endDate: "",
    dialog: false,
    dialogDate: false,
    checkbox: true,
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "red",
      "blue",
      "deep-purple",
      "brown",
      "green",
      "orange",
      "grey darken-1",
    ],

    activity: [
      { title: "Meeting", done: true },
      { title: "Holiday", done: true },
      { title: "PTO", done: true },
      { title: "Travel", done: true },
      { title: "Birthday", done: true },
      { title: "Conference", done: true },
      { title: "Party", done: true },
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Birthday",
      "Conference",
      "Party",
    ],

    newName: "",
    newStart: "",
    newEnd: "",
    newColor: "",
  }),
  mounted() {
    db.collection("CalendarItem").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let postChange = change.doc.data();
        postChange.id = change.doc.id;
        if (change.type === "added") {
          console.log();
          this.events.unshift(postChange);
        }

        if (change.type === "modified") {
          let index = this.events.findIndex(
            (item) => item.id === postChange.id
          );
          Object.assign(this.events[index], postChange);
        }
        if (change.type === "removed") {
          let index = this.events.findIndex(
            (item) => item.id === postChange.id
          );
          this.events.splice(index, 1);
        }
      });
    });
  },
  methods: {
    addEvent() {
      let event = {
        name: this.newName,
        start: this.newStart,
        end: this.newEnd,
        color: this.newColor,
      };
      db.collection("CalendarItem").add(event);
      this.dialog = false;
      this.newName = "";
      this.newStart = "";
      this.newEnd = "";
      this.newColor = "";
    },

    addActivity() {
      this.dialog = !this.dialog;
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>

<style scoped>
.white {
  background-color: white;
  border-radius: 5px;
  padding-top: 5px;
}

.average {
  justify-content: center;
  align-content: center;
}
.average-text {
  text-align: center;
  text-justify: center;
}
</style>