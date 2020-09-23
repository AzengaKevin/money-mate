<template>
  <div class="fill-height grey lighten-2">
    <Navigation title="Calendar" />
    <v-main class="mx-4 my-4">
      <div class="calendar">
          <v-container>
              <v-row>
                  <v-col cols="12" md="8">
                    <Calendar />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row>
                      <v-col>
                        <v-sheet height="64">
                          <v-toolbar flat color="white">
                            <v-toolbar-title class="text-center primary--text">Transactions</v-toolbar-title>
                          </v-toolbar>
                        </v-sheet>
                        <v-sheet height="600" style="height: 600px; max-height: 600px;">
                          <v-card v-for="(transaction, index) in transactions" :key="index">
                            <v-card-text>
                              <v-row>
                                <v-col cols="3">
                                  <v-card outlined flat>
                                    <v-card-text>
                                      <div class="d-flex flex-column primary--text justify-center align-center">
                                        <div>{{ getDay(transaction.date) }}</div>
                                        <div class="text-uppercase">{{ getMonth(transaction.date) }}</div>
                                      </div>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                                <v-col cols="5">
                                    <h3>{{ getCategoryById(transaction.category) }}</h3>
                                    <p>{{ transaction.description }}</p>
                                </v-col>
                                <v-col cols="4">
                                  <div class="" :class=transaction.item>
                                    <span v-if="transaction.item === 'income'">+</span>
                                    <span v-if="transaction.item === 'expenditure'">-</span>
                                    <span>${{ transaction.amount.toFixed(2) }}</span>
                                  </div>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
              </v-row>
          </v-container>
      </div>
    </v-main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Calendar from '@/components/Calendar';

import { mapState } from "vuex";

export default {
  components: {
    Navigation,
    Calendar
  },

  computed: {
    ...mapState(['transactions', 'categories'])
  },

  methods: {
    getCategoryById(id){
      let category =  this.categories.find(category =>  category.id === id)

      if(category){
        return category.name
      }

      return "income";
    },

    getDay(time){
      return time.format("DD");
    },

    getMonth(time){
      return time.format("MMM");
      // return time.format('YYYY-MM-DD hh:mm');
    }
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
