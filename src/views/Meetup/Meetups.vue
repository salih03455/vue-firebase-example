<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 offset-md3 md6>

        <v-card color="cyan darken-2" class="white--text">
          <v-layout>
            <v-flex xs4 pa-2>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                height="125px"
              ></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-title primary-title>
                <div>
                  <div class="headline">Supermodel</div>
                  <div>21.06.2019</div>
                </div>
              </v-card-title>
              <v-card-actions class="pa-2">
                <v-btn flat> <v-icon left>arrow_forward</v-icon> View Meetup</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>
