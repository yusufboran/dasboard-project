<template>
  <div class="pin">
    <v-toolbar
      class="mt-5 mb-5"
      style="border-radius: 5px"
      elevation="4"
      flat
      v-if="searchBar"
    >
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <vbtn icon @click="searchBar = !searchBar" class="mr-2">
        <v-icon size="20">fas fa-search</v-icon>
      </vbtn>
      <v-menu offset-y rounded="lg" bottom :nudge-width="50" left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-badge
              :content="notificationItem.length - numberOfNotificationsViewed"
              :value="messages"
              color="red"
              overlap
              v-if="notificationItem.length != numberOfNotificationsViewed"
              offset-x="-10"
              offset-y="-5"
            >
            </v-badge
            ><v-icon md>far fa-bell</v-icon>
          </v-btn>
        </template>

        <v-card max-width="400" class="mx-auto pb-3">
          <v-list three-line>
            <template v-for="(item, index) in notificationItem">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="index">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
          <div align="center">
            <v-btn color="primary" @click="ReadNotifications()"
              >Read all notifications</v-btn
            >
          </div>
        </v-card>
      </v-menu>

      <span class="ml-3"> Loren Moore</span>
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-2" v-bind="attrs" v-on="on" icon>
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-btn icon>
                <v-avatar size="40">
                  <v-img
                    src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-2/img/avatar-s-2.da5e73c7.jpg"
                  ></v-img>
                </v-avatar>
              </v-btn>
            </v-badge>
          </v-btn>
        </template>
        <v-list>
          <template>
            <v-list-item
              v-for="(item, index) in menu"
              :key="index"
              :to="item.route"
            >
              <v-list-item-action>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-toolbar
      class="mt-5 mb-5"
      style="border-radius: 5px"
      elevation="4"
      flat
      v-else
    >
      <v-text-field
        class="mt-5"
        prepend-icon="mdi-magnify"
        placeholder="Search"
        rounded
        dense
      ></v-text-field>
      <v-btn icon @click="searchBar = !searchBar">
        <v-icon>fas fa-times</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchBar: true,
      numberOfNotificationsViewed: 3,
      menu: [
        {
          action: "far fa-user",
          title: "Profile",
          route: "/profile",
        },
        {
          action: "far fa-envelope",
          title: "Inbox",
          route: "/inbox",
        },
        {
          action: "far fa-check-square",
          title: "Task",
          route: "/task",
        },
        {
          action: "far fa-comment-alt", // or far fa-comment
          title: "Chat",
          route: "/chat",
        },
        {
          action: "mdi-cog-outline",
          title: "Settings",
          route: "/settings",
        },
        {
          action: "mdi-logout",
          title: "Logout",
          route: "",
        },
      ],
      notificationItem: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    };
  },
  methods: {
    ReadNotifications() {
      this.numberOfNotificationsViewed = this.notificationItem.length;
    },
  },
};
</script>

<style>
.pin {
  position: sticky;
  z-index: 1;

  top: 0;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>