import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

// Firebase Config
var firebaseConfig = {
  apiKey: 'AIzaSyDeu28uRXFaVGCew4la1157e_UQ5WX43wU',
  authDomain: 'devmeetup-7808b.firebaseapp.com',
  databaseURL: 'https://devmeetup-7808b.firebaseio.com',
  projectId: 'devmeetup-7808b',
  storageBucket: 'devmeetup-7808b.appspot.com',
  messagingSenderId: '796669805254',
  appId: '1:796669805254:web:d3d5f06804de17a2'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
