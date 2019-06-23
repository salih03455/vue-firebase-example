import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://img-s1.onedio.com/id-54622b6e32abfb2b73ea9d74/rev-0/w-635/listing/f-jpg-webp/s-f471cc6281dc7b71142ac415699de56b93e5361d.webp',
        id: 'asdasdds2323',
        title: 'Meetup in İstanbul',
        date: new Date(),
        location: 'İstanbul',
        description: 'İstanbulu dinliyorum gözlerim kapalı'
      },
      {
        imageUrl: 'https://iasbh.tmgrup.com.tr/8b9609/752/395/212/0/1945/910?u=https://isbh.tmgrup.com.tr/sbh/2018/11/09/dunya-liderleri-pazar-gunu-pariste-toplanacak-1541769911649.jpg',
        id: 'dfgfgdfgrf4545',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'Pariste harikülade bir etkinlik'
      }
    ],
    user: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'dsfsdfgdfggg345'
      }
      commit('createMeetup', meetup)
    },
    signUserUp ({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.id,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    }
  }
})
