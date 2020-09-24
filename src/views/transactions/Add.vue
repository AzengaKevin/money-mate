<template>
  <div class="fill-height white">
    <Navigation title="Add Transaction" />
    <v-main class="mx-4 my-4">
      <v-container>
          <div class="text-center title my-3">{{ title }}</div>
          <v-row class="justify-space-around">
              <v-col cols="12" md="5">
                <v-select
                    :items="items"
                    prepend-icon="mdi-format-list-bulleted"
                    label="Item">
                </v-select>
              </v-col>
              <v-col cols="12" md="5">
                <v-select
                    :items="repeat"
                    prepend-icon="mdi-format-list-bulleted"
                    label="Repeat">
                </v-select>
              </v-col>


              <v-col cols="12" md="5">
                <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="date"
                    label="Date"
                    hint="MM/DD/YYYY"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>


              <v-col cols="12" md="5">
                <v-select
                    :items="categories"
                    prepend-icon="mdi-restore"
                    item-text="name"
                    label="Category">
                </v-select>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field
                    label="Amount"
                    prepend-icon="mdi-account-circle"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="5">
                <v-select
                    :items="payments"
                    prepend-icon="mdi-credit-card"
                    label="Payment">
                </v-select>
              </v-col>

              <v-col class="d-flex justify-end" cols="12">
                  <v-btn color="primary">Submit</v-btn>
              </v-col>
          </v-row>
        
      </v-container>
        
    </v-main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import { mapState } from "vuex";
import moment from "moment";

export default {

    data(vm){
        return {
            title: moment().format('dddd Do MMMM YYYY'),
            date: new Date().toISOString().substr(0, 10),
            repeat: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
            items: ['Income', 'Expenditure'],
            payments: ['cash', 'paypal', 'm-pesa', 'bitcoins'],
            menu1: false,
            dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        }
    },

    computed: {
        ...mapState(['categories']),
        computedDateFormatted () {
            return this.formatDate(this.date)
        },
    },  

    watch: {
        date (val) {
            this.dateFormatted = this.formatDate(this.date)
            console.log(val)
        },
    },

    components: {
        Navigation
    },

    mounted(){
        
    },

    methods: {
        formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
        },
        parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
    },
}
</script>

<style scoped>
  .income{
    color: green;
  }

  .expenditure{
    color: red;
  }
</style>
