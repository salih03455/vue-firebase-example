<template>
  <v-dialog width="350px" persistent v-model="editDialog" format="ISO 8601">
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" style="width: 100%" :reactive="true">
              <template> <!-- ? -->
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="editDialog = false"
                >Close</v-btn>
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="onSaveChanges"
                >Save</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editableDate: null
    }
  },
  methods: {
    onSaveChanges () {
      let newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()
      newDate.setDate(newDay)
      newDate.setMonth(newMonth)
      newDate.setFullYear(newYear)
      const newdate2 = newDate.toISOString()
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newdate2
      })
    }
  },
  created () {
    let date = new Date(this.meetup.date)
    let offsetDate = date.getTimezoneOffset() * 60000
    this.editableDate = (new Date(date - offsetDate)).toISOString().substr(0, 10) // toISOString() -> firebase bu şekilde kabul ediyor
  }
}
</script>
