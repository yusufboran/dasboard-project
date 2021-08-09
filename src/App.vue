<template>
  <v-app style="background: rgb(243, 241, 241)">
    <SideBar />
    <div class="pa-5">
      <v-main>
        <HeaderBar />
        <router-view></router-view>
      </v-main>
    </div>
    <SpeedDial />
  </v-app>
</template>

<script>
import SideBar from "./components/SideBar";
import HeaderBar from "./components/HeaderBar.vue";
import SpeedDial from "./components/SpeedDial.vue";

export default {
  name: "App",

  components: {
    SideBar,
    HeaderBar,
    SpeedDial,
  },

  data: () => ({
    //
  }),
};
</script>
