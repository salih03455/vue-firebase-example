
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

export default {
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
    ]
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    loadMeetups ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value') // anlık değişimlerin anında yansıması için: on() metodu kullanılabilir
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log('Hata', error)
          commit('setLoading', false)
        })
    },
    createMeetup ({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then(data => {
          key = data.key
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.name
          firebase.storage().ref().child('meetups/' + imageUrl).getDownloadURL()
            .then(url => {
              commit('createMeetup', {
                ...meetup,
                imageUrl: url,
                id: key
              })
              return firebase.database().ref('meetups').child(key).update({ imageUrl: url })
            })
            .catch(error => {
              console.log('error 1:', error)
            })
        })
        .catch(error => {
          console.log('error 2:', error)
        })
    },
    updateMeetupData ({ commit }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
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
    }
  }
}
