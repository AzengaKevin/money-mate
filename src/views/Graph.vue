<template>
    <div class="fill-height white">
        <Navigation title="Graph View" />
        <v-main class="mx-4 my-4">
            <v-container>
                <v-sheet>
                    <v-toolbar class="d-flex justify-center" flat>
                        <v-btn text @click="setType('line')" class="primary--text">View Entries</v-btn>
                        <v-btn text @click="setType('pie')" class="ml-4 primary--text">Categorical View</v-btn>
                    </v-toolbar>
                </v-sheet>
                <v-sheet>
                    <v-toolbar class="d-flex justify-center" flat>
                        <v-btn fab text small color="grey darken-2" @click="prev">
                            <v-icon small>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-toolbar-title class="primary--text">{{ selectedDate.format('MMMM') }}</v-toolbar-title>
                        <v-btn fab text small color="grey darken-2" @click="next">
                            <v-icon small>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-sheet>
                <v-sheet>
                    <v-row class="d-flex justify-center">
                        <v-col cols="9" class="">
                            <div v-if="type == 'line'">
                                <line-chart :chart-data="items" :options="optionsLine" label="Transactions"  />
                            </div>
                            <div v-else>
                                <pie-chart :chart-data="items" :options="optionsPie" label="Transactions"  />
                            </div>

                        </v-col>
                    </v-row>
                </v-sheet>
            </v-container>
        
        </v-main>
    </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";

import { mapMutations, mapState } from "vuex";

export default {
    data(){
        return{
            optionsLine: {
                responsive: true,
                maintainAspectRatio: false
            },
            optionsPie: {
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    display: true
                },
                tooltips: {
                    enabled: true
                }
            },
            entries: [],
            title: 'View Entries',
            type: 'line'
        }
    },

  computed: {
    ...mapState(['categories', 'selectedDate']),

    items(){
      const currentMonthItems = this.$store.state.items.filter(item => {
        return item.date.get("year") == this.selectedDate.get("year") && item.date.get("month") == this.selectedDate.get("month");
      });

      let localItems = this.categories.map(({id}) => ({ id : id, total: 0, color: "#000000"}));

      currentMonthItems.forEach(item => {

        localItems = localItems.map(localItem => {
          if(localItem.id == item.categoryId){
            let total = localItem.total + item.amount;

            return {
              id: localItem.id,
              total: total,
              label: this.getCategoryById(localItem.id),
              color: this.getRandomColor()
            } 

          }else {
            return {
              id: localItem.id,
              total: localItem.total,
              label: this.getCategoryById(localItem.id),
              color: this.getRandomColor()
            }
          }
        });

      });

      return localItems;
    }
  },

    components: {
        Navigation,
        LineChart,
        PieChart
    },

    methods: {
        ...mapMutations(['setSelectedDate']),
        
        setType(type){
            this.type = type;
        },

        getRandomColor(){
            return `rgb(
                ${Math.floor(Math.random() * (255 - 0) + 0)},
                ${Math.floor(Math.random() * (255 - 0) + 0)},
                ${Math.floor(Math.random() * (255 - 0) + 0)}
            )`
        },

        getCategoryById(id){

            let category =  this.categories.find(category =>  category.id === id)

            if(category){
                return category.name
            }

            return "income";
        },

        prev () {
            this.setSelectedDate(this.selectedDate.subtract(1, 'months'));
        },

        next () {
            this.setSelectedDate(this.selectedDate.add(1, 'months'));
        },

    }
}
</script>

<style scoped>

</style>