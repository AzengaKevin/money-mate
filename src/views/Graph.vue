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
                        <v-toolbar-title class="primary--text">September</v-toolbar-title>
                        <v-btn fab text small color="grey darken-2" @click="next">
                            <v-icon small>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-sheet>
                <v-sheet>
                    <v-row class="d-flex justify-center">
                        <v-col cols="9" class="">
                            <div v-if="type == 'line'">
                                <line-chart  :chart-data="entries" :options="options" label="Transactions"  />
                            </div>
                            <div v-else>
                                <pie-chart :chart-data="entries" show-labels="true" :options="options" label="Transactions"  />
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

import { mapState } from "vuex";


export default {
    data(){
        return{
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            entries: [],
            title: 'View Entries',
            type: 'pie'
        }
    },

    computed: {
        ...mapState(['transactions', 'categories'])
    },

    components: {
        Navigation,
        LineChart,
        PieChart
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
        setType(type){
            this.type = type;
        }
    }
}
</script>

<style scoped>

</style>