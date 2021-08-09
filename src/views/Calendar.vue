<template>
  <v-row>
    <v-col cols="12" sm="3">
      <div class="white" align="center" justify="space-around">
        <div class="average pa-5">
          <v-dialog
            v-model="dialog"
            width="600"
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="white--text"
                block
                v-bind="attrs"
                v-on="on"
                elevation="4"
                rounded
                @click="addActivity"
                color="deep-purple"
                large
              >
                Add Event</v-btn
              >
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
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="colors"
                        label="Color*"
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="startDate"
                            label="Start*"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="startDate"
                          :allowed-dates="allowedDates"
                          class="mt-4"
                          min="2016-06-15"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-dialog v-model="dialogDate" width="300">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            v-model="birthDay"
                            label="End*"
                            required
                            append-icon="fas fa-birthday-cake"
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>

                        <v-card>
                          <v-card-text>
                            <v-row justify="center" class="pt-6">
                              <v-date-picker
                                v-model="birthDay"
                                @dblclick:date="dialogDate = !dialogDate"
                              />
                            </v-row>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                              color="green darken-1"
                              text
                              @click="dialogDate = false"
                            >
                              Cancel
                            </v-btn>

                            <v-btn
                              color="red darken-1"
                              text
                              @click="addDateTask"
                            >
                              Add
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                  Disagree
                </v-btn>
                <v-btn color="green darken-1" text @click="dialog = false">
                  Agree
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <div>
          <v-list-item v-for="(item, index) in activity" :key="index">
            <v-checkbox
              v-model="item.done"
              :label="item.title"
              :color="colors[index]"
            ></v-checkbox>
          </v-list-item>
        </div>
      </div>
    </v-col>
    <v-col cols="12" sm="9">
      <div class="white">
        <v-row class="fill-height">
          <v-col>
            <v-sheet height="64">
              <v-toolbar flat>
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
                    <v-btn
                      outlined
                      color="grey darken-2"
                      v-bind="attrs"
                      v-on="on"
                    >
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
                    <v-toolbar-title
                      v-html="selectedEvent.name"
                    ></v-toolbar-title>
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
    </v-col>
  </v-row>
</template>
<script>
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
      { title: "Event", done: true },
      { title: "Birthday", done: true },
      { title: "Conference", done: true },
      { title: "Party", done: true },
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
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
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.activity[this.rnd(0, this.activity.length - 1)].title,
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
          done: true,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
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