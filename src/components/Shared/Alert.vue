<template>
  <v-alert error dismissible v-model="alert">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  data () {
    return {
      alert: true
    }
  },
  props: ['text'],
  watch: {
    alert (value) {
      if (value === false) {
        this.$store.dispatch('clearError')
      }
    }
  }
}
</script>
