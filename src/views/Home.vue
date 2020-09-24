<template>
  <div class="fill-height grey lighten-2">
    <Navigation title="Home" />
    <v-main class="mx-4 my-4">
      <div class="home">
        <v-container>
          <h1 class="title">September at a Glance</h1>
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
                        <v-col cols="6" class="d-flex">
                          <pie-chart :chart-data="entries" :show-labels="false" :options="options" label="Transactions"  />
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
import Navigation from '@/components/Navigation';
import PieChart from '@/components/PieChart';
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Navigation,
    PieChart
  },

  computed: {
    ...mapState(['transactions', 'categories'])
  },

  data(){
    return{
      entries: [],
      upcomingIncome: null,
      upcomingExpense: null,
      options: {
          responsive: true,
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
      },
    }
  },

  created(){
    let localEntries = [];

    this.transactions.forEach(transaction => {

        const {
            date,
            amount,
            color,
        } = transaction;

        localEntries.push({
            date,
            total: amount,
            color
        }); 
        
    });

    this.entries = localEntries
    
    console.log(localEntries);
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
