<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-img
            :src="meetup.imageUrl"
            height="300px"
          >
          </v-img>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ meetup.title }}</div>
              <span class="grey--text">{{ meetup.date }}</span>
            </div>
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ab sequi delectus doloremque eveniet earum voluptate accusantium placeat minus optio reprehenderit, maiores voluptatum harum quas. Ullam vel eligendi blanditiis fuga possimus dolore ut doloremque nobis voluptatum aliquam, assumenda incidunt pariatur. At, veniam. In consectetur, ex sit sapiente ullam et dolore!
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>
