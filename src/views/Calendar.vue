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
                        <v-sheet>
                              <v-virtual-scroll
                                :items="items"
                                :item-height="120"
                                height="600"
                              >
                                <template v-slot="{ item }">
                                  <v-list-item>
                                    <v-list-item-content>
                                        <v-card flat>
                                          <v-card-text>
                                            <v-row class="align-center">
                                              <v-col cols="3">
                                                <v-card outlined flat :class="item.date.format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD') ? 'primary': 'white'">
                                                  <v-card-text :class="item.date.format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD') ? 'white--text': 'primary--text'">
                                                    <div class="d-flex flex-column justify-center align-center">
                                                      <div>{{ getDay(item.date) }}</div>
                                                      <div class="text-uppercase">{{ getMonth(item.date) }}</div>
                                                    </div>
                                                  </v-card-text>
                                                </v-card>
                                              </v-col>
                                              <v-col cols="5">
                                                  <h3 class="text-capitalize">{{ getCategoryById(item.categoryId) }} (Category)</h3>
                                                  <p>{{ item.name }}</p>
                                              </v-col>
                                              <v-col cols="4">
                                                <div class="" :class=item.type>
                                                  <span v-if="item.type === 'income'">+</span>
                                                  <span v-if="item.type === 'expense'">-</span>
                                                  <span>${{ item.amount.toFixed(2) }}</span>
                                                </div>
                                              </v-col>
                                            </v-row>
                                          </v-card-text>
                                        </v-card>
                                        <v-divider></v-divider>
                                    </v-list-item-content>
                                  </v-list-item>
                                </template>
                              </v-virtual-scroll>
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
    ...mapState(['items', 'categories', 'selectedDate']),
  },

  mounted(){
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
    }
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
