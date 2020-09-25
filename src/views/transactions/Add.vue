<template>
  <div class="fill-height white">
    <Navigation title="Add Transaction" />
    <v-main class="mx-4 my-4">
      <v-container>
          <div class="text-center title my-3">{{ title }}</div>
          <v-row class="justify-space-around">
              <v-col cols="12" md="5">
                <v-select
                    v-model="item.type"
                    :items="types"
                    prepend-icon="mdi-format-list-bulleted"
                    label="Type">
                </v-select>
              </v-col>
              <v-col cols="12" md="5">
                <v-select
                    v-model="item.recurring"
                    :items="repeats"
                    prepend-icon="mdi-format-list-bulleted"
                    label="Repeat">
                </v-select>
              </v-col>


              <v-col cols="12" md="5">
                <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="item.date"
                    label="Date"
                    hint="MM/DD/YYYY"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    @blur="item.date = parseDate(dateFormatted)"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="item.date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>


              <v-col cols="12" md="5">
                <v-select
                    :items="categories"
                    v-model="item.category"
                    prepend-icon="mdi-restore"
                    item-text="name"
                    label="Category">
                </v-select>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field
                    v-model="item.amount"
                    label="Amount"
                    prepend-icon="mdi-account-circle"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field
                    v-model="item.name"
                    label="Name"
                    prepend-icon="mdi-account-circle"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="5">
                <v-select
                    v-model="item.payment"
                    :items="payments"
                    prepend-icon="mdi-credit-card"
                    label="Payment">
                </v-select>
              </v-col>

              <v-col class="d-flex justify-end" cols="12">
                  <v-btn @click="handleAddItem()" color="primary">Submit</v-btn>
              </v-col>
          </v-row>
        
      </v-container>
        
    </v-main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import { mapMutations, mapState } from "vuex";
import moment from "moment";

export default {

    data(vm){
        return {
            title: moment().format('dddd Do MMMM YYYY'),
            repeats: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
            types: ['income', 'expense'],
            payments: ['cash', 'paypal', 'm-pesa', 'bitcoins'],
            menu1: false,
            dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),

            item:{
              category: null,
              dateCreated: moment(),
              amount: 100.00,
              name: '',
              date: new Date().toISOString().substr(0, 10),
              recurring: null,
              payment: 'Cash',
              color: 'black',
              type: ''
            }
        }
    },

    computed: {
        ...mapState(['categories', 'items']),
        computedDateFormatted () {
            return this.formatDate(this.date)
        },

        itemsCountNext(){
          return this.items.length + 1;
        }
    },  

    watch: {
        date (val) {
            this.dateFormatted = this.formatDate(this.date)
            console.log(val)
        },
    },

    components: {
        Navigation
    },

    mounted(){
        
    },

    methods: {
      ...mapMutations(['addItem']),

      getCategoryIdByName(name){
        let category =  this.categories.find(category =>  category.name === name)

        if(category){
          return category.id
        }

        return null;
      },

      formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
      },
      parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },

      handleAddItem(){
        console.log(this.item);

        const { category, amount, dateCreated, name, date, recurring, payment, type } = this.item;

        const categoryId =this.getCategoryIdByName(category);
        const newDate = moment(date, "YYYY-MM-DD");
        const newAmount = parseFloat(amount);

        console.log({
          itemId: this.itemsCountNext,
          categoryId,
          dateCreated,
          date : newDate,
          amount : newAmount,
          name,
          recurring,
          payment,
          color: 'black',
          type
        });

        this.addItem({
          itemId: this.itemsCountNext,
          categoryId,
          dateCreated,
          date : newDate,
          amount : newAmount,
          name,
          recurring,
          payment,
          color: 'black',
          type
        });

        this.$router.push('/transactions');
      }
    },
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
