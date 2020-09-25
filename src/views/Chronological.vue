<template>
  <div class="fill-height grey lighten-4">
    <Navigation title="Chronological View" />
    <v-main class="mx-4 my-4">

      <v-container>
        <v-sheet class="grey lighten-4">
            <div flat class="d-flex flex-column flex-md-row px-4 py-2 align-md-center">
                <h3>{{ title }}</h3>
                <div class="ml-1 my-2">
                    <v-btn text @click="setFilter('income')" class="rounded-pill grey lighten-2 mx-1">
                      <v-icon v-if="filter == 'income'">mdi-check</v-icon>
                      <span>Income</span>
                    </v-btn>
                    <v-btn text @click="setFilter('expense')" class="rounded-pill grey lighten-2 mx-1">
                      <v-icon v-if="filter == 'expense'">mdi-check</v-icon>
                      <span>Expence</span>
                    </v-btn>
                    <v-btn text @click="setFilter('latest')" class="rounded-pill grey lighten-2 mx-1">
                      <v-icon v-if="filter == 'latest'">mdi-check</v-icon>
                      <span>Recent Activity</span>
                      </v-btn>
                </div>
            </div>
        </v-sheet>
        <v-sheet color="grey lighten-4">
            <v-row class="pa-4">
              <v-col cols="12" md="8">
                <v-row>
                  <v-col cols="12">
                    <v-card flat v-for="item in filteredItems" :key="item.id">
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
                              <h3 class="text-capitalize">{{ getCategoryById(item.categoryId) }}</h3>
                              <div class="caption">{{ item.payment }}</div>
                              <div class="black--text">{{ item.name }}</div>
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
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <v-sheet>
                  <v-row class="align-center pa-4">
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
                    <v-card height="240">
                      <v-card-title>Total Income</v-card-title>
                      <v-card-text>
                        <div class="grey--text caption">{{ selectedDate.format("MMMM YYYY") }}</div>
                        <div class="text-center title green--text">
                          ${{ getTotalMonthIncome().toFixed(2) }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card height="240">
                      <v-card-title>Total Expense</v-card-title>
                      <v-card-text>
                        <div class="grey--text caption">{{ selectedDate.format("MMMM YYYY") }}</div>
                        <div class="text-center title red--text">
                          ${{ getTotalMonthExpense().toFixed(2) }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card height="240">
                      <v-card-title>Target</v-card-title>
                      <v-card-text>
                        <div class="grey--text caption">{{ selectedDate.format("MMMM YYYY") }}</div>
                        <div class="text-center title green--text">
                          ${{ getBudget().toFixed(2) }}
                        </div>
                      </v-card-text>
                    </v-card>                    
                  </v-col>
                  <v-col cols="6">
                    <v-card height="240">
                      <v-card-title>Total Balance</v-card-title>
                      <v-card-text>
                        <div class="grey--text caption">{{ selectedDate.format("MMMM YYYY") }}</div>
                        <div class="text-center title green--text">
                          ${{ (getTotalMonthIncome() - getTotalMonthExpense()).toFixed(2) }}
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
import { mapGetters, mapState } from "vuex";


export default {
  data(){
    return {
      title: 'Recent Ativities',
      entries: [],
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

  props: {
    filter: {
      type: String,
      default: 'latest'
    }
  },

  computed: {
    ...mapState(['items', 'categories', 'selectedDate']),
    filteredItems(){
      if(this.filter == 'latest') return this.items;
      else return this.items.filter(item => item.type == this.filter);
    }
  },
  

  components: {
    Navigation,
    Doughnut
  },

  mounted(){
      
  },

  created(){
    this.entries = [{
      label : 'Target',
      total: this.getBudget(),
      color: '#aaaaaa'
    },{
      label : 'Acheived',
      total: (this.getTotalMonthIncome() - this.getTotalMonthExpense()),
      color: '#000000'
    }];

  },
  
  methods: {
    ...mapGetters(['getTotalMonthExpense', 'getTotalMonthIncome', 'getBudget']),
    setFilter(filter){
      this.filter = filter;
    },

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
