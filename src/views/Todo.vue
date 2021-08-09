<template>
  <div class="home">
    <div class="pa-5" style="background-color: white; height: 100px">
      <v-text-field
        label="Add Task"
        outlined
        append-icon="mdi-plus"
        clearable
        v-model="newTask"
        @click:append="addTask"
        @keyup.enter="addTask"
      />
    </div>
    <div
      v-if="tasks.length === 0"
      style="background-color: white; padding-bottom: 60px"
    >
      <v-layout justify-center align-center>
        <v-img
          src="https://i1.wp.com/www.insansepeti.com/wp-content/uploads/2021/04/mavi-tik.jpg?resize=800%2C554&ssl=1"
          max-height="350"
          max-width="350"
        />
      </v-layout>
    </div>

    <div v-else>
      <v-list class="pb-0">
        <div v-for="task in tasks" :key="task.id">
          <v-list-item
            style="border-bottom: 1px solid gray"
            @click="doneTask(task)"
            :class="{ 'blue lighten-5': task.done }"
          >
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox :input-value="task.done"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title
                  :class="{ 'text-decoration-line-through': task.done }"
                >
                  {{ task.title }}
                </v-list-item-title>
              </v-list-item-content>

              <span v-if="task.showTask" class="text-caption grey--text">
                <v-icon color="grey lighten-1">mdi-calendar</v-icon>
                <span> {{ task.date.day }} / {{ task.date.month }} </span>

                <span v-if="task.date.year != now">
                  / {{ task.date.year }}
                </span>
              </span>

              <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ma-2" v-bind="attrs" v-on="on" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="deleteTask(task)">
                    <v-btn icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    Delete
                  </v-list-item>
                  <v-list-item @click="editbtn(task)">
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    Edit
                  </v-list-item>
                  <v-list-item @click="datebtn(task)">
                    <v-btn icon>
                      <v-icon>mdi-calendar</v-icon>
                    </v-btn>
                    Date
                  </v-list-item>
                  <v-list-item @click="dialogError = true">
                    <v-btn icon>
                      <v-icon>mdi-format-align-justify</v-icon>
                    </v-btn>
                    Sort
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-list-item>
        </div>
      </v-list>
    </div>
    <div>
      <div class="editDialog">
        <v-dialog v-model="dialog" max-width="300">
          <v-card>
            <v-card-title class="text-h5"> Edit Task </v-card-title>

            <v-card-text> Edit the title of this task </v-card-text>

            <v-container class="pr-5 pl-5">
              <v-text-field v-model="editTitle.title" @keyup.enter="editTask" />
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">
                Cancel
              </v-btn>

              <v-btn color="red darken-1" text @click="editTask()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="dateDialog">
        <v-dialog v-model="dialogDate" max-width="300">
          <v-card>
            <v-card-text>
              <v-row justify="center" class="pt-6">
                <v-date-picker
                  v-model="picker"
                  @dblclick:date="addDateTask()"
                />
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-container class="px-0" fluid>
                <v-switch v-model="showTask" label="Show" />
              </v-container>

              <v-btn color="green darken-1" text @click="dialogDate = false">
                Cancel
              </v-btn>

              <v-btn color="red darken-1" text @click="addDateTask">
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="errorDialog">
        <v-dialog v-model="dialogError" max-width="300">
          <v-card>
            <v-card-title class="text-h5"> Updated</v-card-title>

            <v-card-text>
              Missing features will be activated with the update.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="dialogError = false"> OK </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="snackbar">
        <v-snackbar v-model="snackbar" timeout="2000">
          <span v-if="trashTask == ''"> Added Task! </span>
          <span v-else> Delete Task! </span>

          <template v-slot:action="{ attrs }">
            <v-btn
              color="blue"
              value="Close"
              text
              v-bind="attrs"
              @click="addTaskSnackbar()"
              v-if="trashTask == ''"
            >
              Close
            </v-btn>
            <v-btn
              color="blue"
              value="Close"
              text
              v-bind="attrs"
              @click="deleteTaskSnackbar()"
              v-else
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar v-model="snackbarEdit" timeout="2000">
          Task Updated!
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="cancelEditTask()">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/firebase";
export default {
  name: "Home",
  data() {
    return {
      switch1: false,
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      now: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
        .slice(0, 4),

      trashTask: "",
      beforeTask: "",
      newTask: "",
      editTitle: " ",
      showTask: false,

      snackbar: false,
      snackbarEdit: false,

      dialog: false,
      dialogDate: false,
      dialogError: false,
      changeID: "",
      tasks: [],
    };
  },
  methods: {
    doneTask(task) {
      db.collection("TodoItem").doc(task.id).update({
        done: !task.done,
      });
    },
    deleteTask(task) {
      this.trashTask = task;
      db.collection("TodoItem").doc(task.id).delete();
      this.snackbar = true;
    },
    deleteTaskID(id) {
      db.collection("TodoItem").doc(id).delete();
    },
    editbtn(task) {
      let item = {
        id: task.id,
        title: task.title,
      };
      this.beforeTask = {
        id: task.id,
        title: task.title,
      };
      this.editTitle = item;
      this.dialog = true;
    },
    datebtn(task) {
      this.showTask = task.showTask;
      this.dialogDate = true;
      this.changeID = task.id;
    },
    editTask() {
      db.collection("TodoItem").doc(this.editTitle.id).update({
        title: this.editTitle.title,
      });
      this.dialog = false;
      this.snackbarEdit = true;
    },
    cancelEditTask() {
      db.collection("TodoItem").doc(this.beforeTask.id).update({
        title: this.beforeTask.title,
      });

      this.snackbarEdit = false;
    },
    addTask() {
      if (this.newTask.length > 0 && this.newTask.trim() != "") {
        this.trashTask = "";
        let task = {
          done: false,
          title: this.newTask.trim(),
          date: "",
          showTask: false,
        };
        this.newTask = "";
        db.collection("TodoItem").add(task);

        this.snackbar = true;
      }
    },
    addTaskSnackbar() {
      this.snackbar = false;

      this.deleteTaskID(this.tasks[0].id);
    },
    deleteTaskSnackbar() {
      db.collection("TodoItem").add(this.trashTask);
      this.trashTask = "";
    },
    addDateTask() {
      this.dialogDate = false;

      let time = {
        year: this.picker.slice(0, 4),
        month: this.picker.slice(5, 7),
        day: this.picker.slice(8, 10),
      };
      db.collection("TodoItem").doc(this.changeID).update({
        date: time,
      });

      db.collection("TodoItem").doc(this.changeID).update({
        showTask: this.showTask,
      });
    },
  },
  mounted() {
    db.collection("TodoItem").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let postChange = change.doc.data();
        postChange.id = change.doc.id;
        if (change.type === "added") {
          console.log();
          this.tasks.unshift(postChange);
        }

        if (change.type === "modified") {
          let index = this.tasks.findIndex((item) => item.id === postChange.id);
          Object.assign(this.tasks[index], postChange);
        }
        if (change.type === "removed") {
          let index = this.tasks.findIndex((item) => item.id === postChange.id);
          this.tasks.splice(index, 1);
        }
      });
    });
  },
};
</script>