<template>
  <div class="mt-5">
    <v-row>
      <v-col cols="12" sm="4" v-for="item in items" :key="item">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card
            :color="`${item.color.bg} darken-1`"
            :elevation="hover ? 16 : 2"
          >
            <v-row>
              <v-col cols="12" sm="8">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn
                        fab
                        :color="`${item.color.bg} lighten-2`"
                        lighten-2
                        elevation="0"
                      >
                        <v-icon color="white">{{ item.currency }}</v-icon>
                      </v-btn>
                    </div>
                    <v-list-item-title
                      class="mb-1 white--text"
                      style="font-size: 24px"
                    >
                      ${{ item.data.rate }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text">
                      {{ item.data.description }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="4">
                <v-avatar size="100" class="ml-n10 mt-6" tile>
                  <v-icon size="100" color="white">fab fa-bitcoin</v-icon>
                </v-avatar>
              </v-col>
            </v-row>
            <v-list-item-subtitle
              style="text-align: right; font-size: 12px"
              :style="`color: #${item.color.icon}`"
            >
              {{ currencyUpdatedTime }}
            </v-list-item-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-app-bar flat color="rgba(0,0,0,0)">
            <v-toolbar-title class="title black--text pl-0 ml-2">
              Impression
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              :class="`${weeklyButton.textColor} mr-2`"
              :color="`deep-purple ${weeklyButton.color}`"
              @click="Weekly()"
              >Weekly</v-btn
            >
            <v-btn
              :color="`deep-purple ${monthlyButton.color}`"
              :class="monthlyButton.textColor"
              @click="Monthly()"
              >Monthly</v-btn
            >
          </v-app-bar>
          <v-sparkline
            :fill="fill"
            :line-width="width"
            :padding="padding"
            :smooth="radius || false"
            :value="value"
            auto-draw
            color="deep-purple"
          ></v-sparkline>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-app-bar flat color="rgba(0,0,0,0)">
            <v-toolbar-title class="title black--text pl-0 ml-2">
              Activity
            </v-toolbar-title>
          </v-app-bar>
          <v-app-bar flat color="rgba(0,0,0,0)">
            <v-btn fab color="purple lighten-4" elevation="0">
              <v-icon color="purple">fab fa-bitcoin</v-icon>
            </v-btn>
            <v-toolbar-title class="title black--text ml-2">
              Sent Bitcoin
              <span class="caption"><br />To Bitcoin Address</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="subtitle-1 black--text ml-2">
              -0.00257 BTC
            </v-toolbar-title>
            <v-icon color="green" class="ml-2">fas fa-long-arrow-alt-up</v-icon>
          </v-app-bar>
          <v-app-bar flat color="rgba(0,0,0,0)">
            <v-btn fab color="green lighten-4" elevation="0">
              <v-icon color="green">fas fa-yen-sign</v-icon>
            </v-btn>
            <v-toolbar-title class="title black--text ml-2">
              Receive Lightcoin <span class="caption"><br />Pending</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="subtitle-1 black--text ml-2">
              -0.0133643 LTC
            </v-toolbar-title>
            <v-icon color="red" class="ml-2">fas fa-long-arrow-alt-down</v-icon>
          </v-app-bar>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card height="180px">
          <v-row>
            <v-col cols="12" sm="4">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">Bitcoin</div>
                  <v-list-item-title class="headline mb-1 black--text">
                    2.5578 BTC
                  </v-list-item-title>
                  <v-list-item-subtitle class="grey--text"
                    >$2500 USD</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="8">
              <v-sparkline
                :value="value"
                :smooth="radius || false"
                :padding="padding"
                :line-width="width"
                :stroke-linecap="lineCap"
                :fill="fills"
                :type="type"
                :auto-line-width="autoLineWidth"
                auto-draw
                color="red"
              >
              </v-sparkline>
              <v-card-actions class="justify-end">
                <v-btn text color="green">
                  <v-icon class="mt-n2 pr-2">fas fa-sort-down</v-icon> 8.5
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-row>
            <v-col cols="12" sm="6" class="border">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">Your Portfolio</div>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-progress-circular
                        rotate="360"
                        size="100"
                        width="15"
                        value="65"
                        color="teal"
                      >
                        65%
                      </v-progress-circular>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-list-item-subtitle class="grey--text mt-8"
                        >2.5578 BTC</v-list-item-subtitle
                      >
                      <v-list-item-subtitle class="grey--text"
                        >2500 USD</v-list-item-subtitle
                      >
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-sol cols="12" sm="6" align="center">
              <v-list-item two-line class="mt-10">
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1 black--text">
                    $8520.50
                  </v-list-item-title>
                  <v-list-item-subtitle class="grey--text"
                    >Pending Balance</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-sol>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data: () => ({
    weeklyButton: {
      color: "",
      textColor: "white--text",
    },
    monthlyButton: {
      color: "lighten-4",
      textColor: "deep-purple--text",
    },
    fill: true,
    padding: 8,
    radius: 10,
    value: [0, 2, 5, 9, 5, 10, 3],
    width: 2,
    lineCap: "round",
    type: "trend",
    autoLineWidth: false,
    fills: false,
    currencyUpdatedTime: null,
    items: [
      {
        currency: "fas fa-euro-sign",
        color: { icon: "4dd0e1", bg: "cyan" },
        data: "",
      },
      {
        currency: "fas fa-pound-sign",
        color: { icon: "ffb74d", bg: "orange " },
        data: "",
      },
      {
        currency: "fas fa-dollar-sign",
        color: {
          icon: "9575cd",
          bg: "deep-purple",
        },
        data: "",
      },
    ],
  }),

  mounted() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        this.currencyUpdatedTime = response.data.time.updated;
        this.items[0].data = response.data.bpi.EUR;
        this.items[1].data = response.data.bpi.GBP;
        this.items[2].data = response.data.bpi.USD;
        console.log(response.data.bpi.USD);
      });
  },
  /* weeklyButton: {
      color: "",
      textColor: "white--text",
    },
    monthlyButton: {
      color: "lighten-4",
      textColor: "deep-purple--text",
    },
*/
  methods: {
    WBtn() {
      this.weeklyButton.color = "";
      this.weeklyButton.textColor = "white--text";
      this.monthlyButton.color = "lighten-4";
      this.monthlyButton.textColor = "deep-purple--text";
    },
    MBtn() {
      this.weeklyButton.color = "lighten-4";
      this.weeklyButton.textColor = "deep-purple--text";
      this.monthlyButton.color = "";
      this.monthlyButton.textColor = "white--text";
    },
    Weekly() {
      this.WBtn();
      this.value = [8.56, 8.54, 8.44, 8.43, 8.34, 8.40, 8.74];
    },
    Monthly() {
      this.MBtn();
      this.value = [
        8.56, 8.54, 8.44, 8.43, 8.34, 8.40, 8.74, 8.80, 8.88, 8.84, 8.78, 8.90, 8.83, 8.82,
        8.90, 8.94, 8.89, 8.82, 8.87, 8.83, 8.60, 8.65, 8.71, 8.66, 8.60, 8.64, 8.62, 8.55
      ];
    },
  },
};
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>
<style scoped>
</style>
