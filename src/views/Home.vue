<template>
  <div class="fill-height grey lighten-2">
    <Navigation title="Home" />
    <v-main class="mx-4 my-4">
      <div class="home">
        <v-container>
          <h1 class="title">{{ month }} at a Glance</h1>
              <v-row align="center" justify="space-between">
                <v-col cols="12" sm="5">
                  <v-card
                    class="pb-4 mb-6"
                    color="white"
                    outlined
                    tile
                    link
                    to="/transactions"
                    height="200"
                  >
                    <v-card-title>Upcoming Expense</v-card-title>
                    <v-card-text class="text-center">
                      <div class="display-1 black--text">${{ upcomingExpense.amount.toFixed(2) }}</div>
                      <div class="caption">{{ upcomingExpense.name }} - {{ upcomingExpense.date.format("DD/MM/YYYY") }}</div>
                    </v-card-text>
                    
                  </v-card>
                </v-col>
                <v-col cols="12" sm="5">
                  <v-card
                  color="white"
                    class="pb-4 mb-6"
                    outlined
                    tile
                    height="200"
                  >
                    <v-card-title>Upcoming Income</v-card-title>
                    <v-card-text class="text-center">
                      <div class="display-1 black--text">${{ upcomingIncome.amount.toFixed(2) }}</div>
                      <div class="caption">{{ upcomingIncome.name }} - {{ upcomingIncome.date.format("DD/MM/YYYY") }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="5">
                  <v-card
                    class="pb-4 mb-6"
                    color="white"
                    outlined
                    tile>
                    <v-card-title>Categories Piechart</v-card-title>
                    <v-card-text class="text-center"> 
                      <v-row>
                        <v-col cols="12" sm="5">
                          <v-spacer></v-spacer>
                          <pie-chart :chart-data="items" :options="options" label="Transactions" />
                          <v-spacer></v-spacer>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    
                  </v-card>
                </v-col>
                <v-col cols="12" sm="5">
                  <v-card
                  color="white"
                    class="pb-4 mb-6"
                    outlined
                    height="200"
                    tile
                  >
                    <v-card-title>Monthly Variance</v-card-title>
                    <v-card-text class="text-center">
                      <div class="display-1 blue--text">$18.840</div>
                      <div class="caption">Over</div>
                    </v-card-text>
                  </v-card>
                </v-col>                
              </v-row>
        </v-container>
        <v-btn fixed
              dark
              fab
              bottom
              right
              class="mr-3"
              color="primary">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-main>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import PieChart from "@/components/PieChart";
import { mapGetters, mapState } from "vuex";

import moment from "moment";

export default {
  components: {
    Navigation,
    PieChart
  },

  data(){
    return{
      month: moment().format("MMMM"),
      upcomingIncome: null,
      upcomingExpense: null,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      },
    }
  },

  computed: {
    ...mapState(['categories']),
    items(){
      const currentMonthItems = this.$store.state.items.filter(item => {
        return item.date.get("year") == moment().get("year") && item.date.get("month") == moment().get("month");
      });

      let localItems = this.categories.map(({id}) => ({ id : id, total: 0, color: "#000000"}));

      currentMonthItems.forEach(item => {

        localItems = localItems.map(localItem => {
          if(localItem.id == item.categoryId){
            let total = localItem.total + item.amount;

            return {
              id: localItem.id,
              total: total,
              color: localItem.color
            } 

          }else {
            return {
              id: localItem.id,
              total: localItem.total,
              color: localItem.color
            }
          }
        });

      });

      return localItems;
    }
  },

  created(){
  },
  
  methods: {
    ...mapGetters(['getUpcomingIncome', 'getUpcomingExpense'])
  },

  beforeMount(){
    this.upcomingIncome = this.getUpcomingIncome();
    this.upcomingExpense = this.getUpcomingExpense();
  }
  
}
</script>

<style scoped>
</style>
