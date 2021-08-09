<template>
  <div id="create" class="pin">
    <v-speed-dial
      v-model="fab"
      :bottom="true"
      :right="true"
      direction="top"
      :open-on-hover="true"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-account-circle </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  data: () => ({
    direction: "top",
    fab: false,
    transition: "slide-y-reverse-transition",
  }),
};
</script>

<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}

.pin {
  position: sticky;
  z-index: 1;
  bottom: 0;
}
</style>