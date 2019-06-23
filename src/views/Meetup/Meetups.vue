<template>
  <v-container>
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-flex xs12 offset-md3 md6>

        <v-card color="cyan darken-2" class="white--text">
          <v-layout>
            <v-flex xs4 pa-2>
              <v-img
                :src="meetup.imageUrl"
                height="125px"
              ></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ meetup.title }}</div>
                  <div>{{ meetup.date | date }}</div>
                </div>
              </v-card-title>
              <v-card-actions class="pa-2">
                <v-btn flat :to="'/meetups/'+meetup.id"> <v-icon left>arrow_forward</v-icon> View Meetup</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>
