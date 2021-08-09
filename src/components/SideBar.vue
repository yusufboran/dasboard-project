<template>
  <v-navigation-drawer permanent app :mini-variant.sync="mini" v-model="mini">
    <v-list-item class="px-2 py-5">
      <v-list-item-title class="text-capitalize" align="center">
        <span v-if="!mini" class="font-weight-bold text-gray">Loren</span>
        <v-icon x-large>fas fa-signature</v-icon>
      </v-list-item-title>
      <v-btn icon @click.stop="mini = true">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-list nav dense>
      <v-list-item-group color="deep-purple">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.route">
          <v-list-item-icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" v-text="item.icon" />
              </template>
              <span v-text="item.text"></span>
            </v-tooltip>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-slot:append v-if="wait()">
      <div class="pa-2">
        <v-card align="center" class="pa-3">
          <v-badge
            bordered
            bottom
            color="green"
            dot
            offset-x="10"
            offset-y="10"
            class="mb-8"
          >
            <v-avatar size="40">
              <v-img
                src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-2/img/avatar-s-2.da5e73c7.jpg"
              ></v-img>
            </v-avatar>
          </v-badge>
          <h4 class="grey--text">Total Balance</h4>
          <h2>$852.50</h2>
          <h5 class="green--text">+$584.50 today</h5>
          <v-card color="deep-purple" dark class="mt-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title> Your Wallet Address </v-list-item-title>
                <v-list-item-subtitle>
                  3QjwF2YkhdygZ47Akjh
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-card>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    mini: true,

    items: [
      { icon: "fas fa-home", text: "Home", route: "/" },
      {
        icon: "fas fa-list-alt",
        text: "Product List",
        route: "/product-list",
      },
      { icon: "mdi-format-list-checks", text: "Todo", route: "/todo" },
      { icon: "fas fa-calendar-day", text: "Calendar", route: "/calendar" },
      { icon: "fas fa-cog", text: "Settings", route: "/settings" },
      { icon: "fas fa-question", text: "About", route: "/about" },
    ],
  }),
  methods: {
    wait() {
      if (this.mini) return;

      new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      return true;
    },
  },
};
</script>
