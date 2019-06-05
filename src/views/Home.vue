<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetups" class="primary">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetup/new" class="primary">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click="onLoadMeetup(meetup.id)"
          >
            <div class="title">
              {{meetup.title}}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      meetups: [
        { imageUrl: 'https://img-s1.onedio.com/id-54622b6e32abfb2b73ea9d74/rev-0/w-635/listing/f-jpg-webp/s-f471cc6281dc7b71142ac415699de56b93e5361d.webp', id: 'asdasdds2323', title: 'Meetup in İstanbul' },
        { imageUrl: 'https://iasbh.tmgrup.com.tr/8b9609/752/395/212/0/1945/910?u=https://isbh.tmgrup.com.tr/sbh/2018/11/09/dunya-liderleri-pazar-gunu-pariste-toplanacak-1541769911649.jpg', id: 'dfgfgdfgrf4545', title: 'Meetup in Paris' }
      ]
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgb(0, 0, 0, 0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
