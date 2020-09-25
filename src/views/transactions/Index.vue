<template>
  <div class="fill-height white">
    <Navigation title="Monthly Transactions" />
    <v-main class="mx-4 my-4">

      <v-container>
        <div class="text-center title my-3">{{ title }}</div>

        <v-sheet color="grey lighten-3">
            <div class="font-wiehgt-bold display-1 text-center py-3">Monthly Transactions View</div>
            <v-row class="pa-4">
              <v-col v-for="(item, index) in items" :key="index" cols="12" md="6">
                <v-card flat>
                  <v-card-title>{{ item.name }}</v-card-title>
                  <v-card-text>
                    <div class="d-flex justify-space-between align-center">
                      <div>{{ item.date.calendar() }}</div>
                      <div class="display-1" :class="item.type">
                        <span v-if="item.type === 'income'">+</span>
                        <span v-if="item.type === 'expense'">-</span>
                        <span>${{ item.amount.toFixed(2) }}</span>
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

    <v-btn fixed
          link
          dark
          fab
          bottom
          right
          class="mr-3"
          color="primary"
          to="/transactions/create">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
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
    }
  },
  computed: {
    ...mapState(['transactions', 'items'])
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

  .expense{
    color: red;
  }
</style>
