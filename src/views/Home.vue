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
                  >
                    <v-card-title>Upcoming Expense</v-card-title>
                    <v-card-text class="text-center">
                      <div class="display-1 black--text">$150.00</div>
                      <div class="caption">Elecrtricity - 25/09/2020</div>
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
                    <v-card-title>Upcoming Income</v-card-title>
                    <v-card-text class="text-center">
                      <div class="display-1 black--text">$1,750.00</div>
                      <div class="caption">Pay Check - 21/09/2020</div>
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
                        <v-col cols="6">
                          <pie-chart :chart-data="entries" show-labels="false" :options="options" label="Transactions"  />
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
import { mapState } from "vuex";

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
      options: {
          responsive: true,
          maintainAspectRatio: false
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
  }
  
}
</script>

<style scoped>

</style>
