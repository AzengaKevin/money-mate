<template>
  <div class="fill-height grey lighten-4">
    <Navigation title="Chronological View" />
    <v-main class="mx-4 my-4">

      <v-container>
        <v-sheet class="grey lighten-4">
            <div flat class="d-flex flex-column flex-md-row px-4 py-2 align-md-center">
                <h3>{{ title }}</h3>
                <div class="ml-1 my-2">
                    <v-btn text class="rounded-pill grey lighten-2 mx-1">Income</v-btn>
                    <v-btn text class="rounded-pill grey lighten-2 mx-1">Expence</v-btn>
                    <v-btn text class="rounded-pill grey lighten-2 mx-1">Recent Activity</v-btn>
                </div>
            </div>
        </v-sheet>
        <v-sheet color="grey lighten-4">
            <v-row class="pa-4">
              <v-col cols="12" md="8">
                <v-row>
                  <v-col v-for="(transaction, index) in transactions" :key=index cols="12">
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
              </v-col>
              <v-col cols="12" md="4">
                <v-sheet>
                  <v-row class="align-center pa-3">
                    <v-col cols="6">
                      <doughnut :chart-data="entries" :options="options" label="Transactions"  />
                    </v-col>
                    <v-col cols="6">
                      <h3 class="primary--text">Target Acheived</h3>
                    </v-col>
                  </v-row>
                </v-sheet>
                <v-row>
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>Total Income</v-card-title>
                      <v-card-text>
                        <div class="grey--text caption">September 2020</div>
                        <div class="text-center title green--text">
                          $1000.00
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>Total Expense</v-card-title>
                      <v-card-text>
                        <div class="grey--text caption">September 2020</div>
                        <div class="text-center title red--text">
                          $500.00
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>Target</v-card-title>
                      <v-card-text>
                        <div class="grey--text caption">September 2020</div>
                        <div class="text-center title green--text">
                          $2500.00
                        </div>
                      </v-card-text>
                    </v-card>                    
                  </v-col>
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>Total Balance</v-card-title>
                      <v-card-text>
                        <div class="grey--text caption">September 2020</div>
                        <div class="text-center title green--text">
                          $25000.00
                        </div>
                      </v-card-text>
                    </v-card>                    
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
        </v-sheet>
      </v-container>
        
    </v-main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Doughnut from '@/components/Doughnut';
import { mapState } from "vuex";


export default {
  data(){
    return {
      title: 'Recent Ativities',
      filter: 'latest',
      entries: [],
      options: {
          responsive: true,
          maintainAspectRatio: false
      },
    }
  },
  computed: {
    ...mapState(['transactions', 'categories'])
  },
  

  components: {
    Navigation,
    Doughnut
  },

  mounted(){
      
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
  .income{
    color: green;
  }

  .expenditure{
    color: red;
  }
</style>
