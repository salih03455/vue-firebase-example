import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Edit/EditMeetupDetailsDialog'
import EditMeetupDateDialog from './components/Edit/EditMeetupDateDialog'
import EditMeetupTimeDialog from './components/Edit/EditMeetupTimeDialog'
import RegisterDialog from './components/Registration/RegisterDialog'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDeu28uRXFaVGCew4la1157e_UQ5WX43wU',
  authDomain: 'devmeetup-7808b.firebaseapp.com',
  databaseURL: 'https://devmeetup-7808b.firebaseio.com',
  projectId: 'devmeetup-7808b',
  storageBucket: 'gs://devmeetup-7808b.appspot.com/',
  messagingSenderId: '796669805254',
  appId: '1:796669805254:web:d3d5f06804de17a2'
})

// Oturum açmış kullanıcı var mı yok mu?
firebase.auth().onAuthStateChanged(user => {
  if (user) { // kullanıcı varsa
    console.log('user var', user)
    store.dispatch('autoSignIn', user)
    store.dispatch('fetchUserData')
  } else { // kullanıcı yoksa
    console.log('user yok')
  }
  new Vue({
    router,
    store,
    render: h => h(App),
    created () {
      store.dispatch('loadMeetups')
    }
  }).$mount('#app')
})
