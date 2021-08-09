<template>
  <div>
    <v-tabs vertical style="border-radius: 5px">
      <v-tab v-for="item in tableItems" :key="item.id" color="deep-purple">
        <v-list-item>
          <v-icon left>{{ item.icon }} </v-icon>
          {{ item.title }}
        </v-list-item>
      </v-tab>
      <v-tab-item class="general pt-2">
        <v-card flat style="border-radius: 5px">
          <v-card-text>
            <v-row>
              <div class="image">
                <v-img
                  width="80"
                  src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-2/img/avatar-s-2.da5e73c7.jpg"
                />
              </div>
              <v-row>
                <v-col cols="12" sm="6" class="mt-2">
                  <v-btn class="mx-3 white--text" small color="deep-purple"
                    >Upload</v-btn
                  >
                  <v-btn small>Reset</v-btn>
                </v-col>
                <v-col> </v-col>
              </v-row>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="Username"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="E-mail"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Company"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn class="mr-2 white--text" color="deep-purple"
                  >Save Changes</v-btn
                >
                <v-btn class="ml-2">Reset</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="password">
        <v-card flat style="border-radius: 5px">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="oldPassword"
                  :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showOldPassword ? 'text' : 'password'"
                  name="input-10-1"
                  label="Old Password"
                  counter
                  @click:append="showOldPassword = !showOldPassword"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newPassword"
                  :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="showNewPassword ? 'text' : 'password'"
                  name="input-10-1"
                  label="New Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="showNewPassword = !showNewPassword"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="retypeNewPassword"
                  :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[retypeNewPassword == newPassword]"
                  :type="showNewPassword ? 'text' : 'password'"
                  name="input-10-1"
                  label="Retype New Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="showNewPassword = !showNewPassword"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn
                  class="mr-2 white--text"
                  color="deep-purple"
                  @click="changePassword()"
                  >Save Changes</v-btn
                >
                <v-btn class="ml-2">Reset</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="information">
        <v-card flat style="border-radius: 5px">
          <v-card-text>
            <v-row>
              <v-textarea outlined label="Bio" counter clearable></v-textarea>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-dialog v-model="dialog" width="300">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      required
                      v-model="birthDay"
                      label="Birth Day*"
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
                          @dblclick:date="dialog = !dialog"
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

                      <v-btn color="red darken-1" text @click="addDateTask">
                        Add
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="countryList"
                  label="Country*"
                  required
                  append-icon="fas fa-map-marker-alt"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="Website"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Phone Number"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn class="mr-2 white--text" color="deep-purple"
                  >Save Changes</v-btn
                >
                <v-btn class="ml-2">Reset</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="social">
        <v-card flat style="border-radius: 5px">
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="3"
                v-for="item in socialItem"
                :key="item"
                class="average-text"
              >
                <v-list-item-title>Your {{ item.title }} </v-list-item-title>
                <div v-if="item.connected">
                  <v-list-item-title>
                    <v-list-item-avatar size="40" class="ml-4">
                      <v-img :src="item.avatarImg"></v-img>
                    </v-list-item-avatar>
                  </v-list-item-title>
                  <v-list-item-content>
                    <v-list-item-title>
                      @{{ item.username }}
                    </v-list-item-title>
                    <v-list-item-title class="deep-purple--text">
                      Disconnect
                    </v-list-item-title>
                  </v-list-item-content>
                </div>
                <div v-else>
                  <v-btn class="connect deep-purple--text mt-10">
                    Connect
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="notification">
        <v-card flat style="border-radius: 5px">
          <v-card-text>
            <v-subheader>Activity</v-subheader>
            <v-switch
              inset
              color="deep-purple"
              label="Email me when someone comments on my article"
            ></v-switch>
            <v-switch
              inset
              color="deep-purple"
              label="Email me when someone answers on my form"
            ></v-switch>
            <v-switch
              inset
              color="deep-purple"
              label="Email me hen someone follows"
            ></v-switch>
            <v-divider></v-divider>
            <v-subheader>Application</v-subheader>
            <v-switch
              inset
              color="deep-purple"
              label="News and announcements"
            ></v-switch>
            <v-switch
              inset
              color="deep-purple"
              label="Email me when someone answers on my form"
            ></v-switch>
            <v-switch
              inset
              color="deep-purple"
              label="Email me hen someone follows"
            ></v-switch>
            <v-col cols="12" sm="6">
              <v-btn class="mr-2 white--text" color="deep-purple"
                >Save Changes</v-btn
              >
              <v-btn class="ml-2">Reset</v-btn>
            </v-col>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      showOldPassword: false,
      showNewPassword: false,
      oldPassword: "",
      newPassword: "",
      retypeNewPassword: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      socialItem: [
        {
          title: "Twitter",
          avatarImg:
            "https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-2/img/avatar-s-2.da5e73c7.jpg",
          username: "johndoe",
          connected: true,
        },
        {
          title: "Facebook",
          avatarImg:
            "https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-2/img/avatar-s-2.da5e73c7.jpg",
          username: "johndoe",
          connected: false,
        },
        {
          title: "Google",
          avatarImg:
            "https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-2/img/avatar-s-2.da5e73c7.jpg",
          username: "johndoe",
          connected: true,
        },
        {
          title: "GitHub",
          avatarImg:
            "https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-2/img/avatar-s-2.da5e73c7.jpg",
          username: "johndoe",
          connected: false,
        },
      ],
      tableItems: [
        {
          id: 1,
          icon: "fas fa-user",
          title: "General",
        },
        {
          id: 2,
          icon: "fas fa-lock",
          title: "Ghange Password",
        },
        {
          id: 3,
          icon: " mdi-information-outline",
          title: "Informaion",
        },
        {
          id: 4,
          icon: "fas fa-link ",
          title: "Social",
        },
        {
          id: 5,
          icon: " fas fa-bell",
          title: "Notifications",
        },
      ],
      countryList: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands",
      ],
    };
  },
  method: {
    changePassword() {
      this.value++;
    },
  },
};
</script>

<style>
.connect {
  background: white;
  border: 1px solid #673ab7;
  color: #673ab7;
}

.average-text {
  text-align: center;
  text-justify: center;
}
.image {
  border-radius: 5px;
  border: 1px solid;
  margin-left: 12px;
}
</style>