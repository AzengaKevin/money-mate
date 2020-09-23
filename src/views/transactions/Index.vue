<template>
  <div class="fill-height white">
    <Navigation title="Monthly Transactions" />
    <v-main class="mx-4 my-4">

      <v-container>
        <div class="text-center title my-3">{{ title }}</div>

        <v-sheet color="grey lighten-3">
            <v-row class="pa-4">
              <v-col v-for="(transaction, index) in transactions" :key=index cols="12" md="6">
                <v-card flat>
                  <v-card-title>{{ transaction.description }}</v-card-title>
                  <v-card-text>
                    <div class="d-flex justify-space-between align-center">
                      <div>{{ transaction.date.calendar() }}</div>
                      <div class="display-1" :class=transaction.item>
                        <span v-if="transaction.item === 'income'">+</span>
                        <span v-if="transaction.item === 'expenditure'">-</span>
                        <span>${{ transaction.amount.toFixed(2) }}</span>
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions></v-card-actions>
                </v-card>
              </v-col>
            </v-row>
        </v-sheet>
      </v-container>
        
    </v-main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import { mapState } from "vuex";
import moment from "moment";

export default {
  data(){
    return {
      title: moment().format('dddd Do MMMM YYYY'),

      //Use date as the key for the map
      entries: new Map(),

      entriesPopulated : false
    }
  },
  computed: {
    ...mapState(['transactions'])
  },
  

  components: {
    Navigation
  },

  mounted(){
      
  }
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
