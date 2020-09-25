import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  
  state: {
    links: [
        {icon: 'mdi-home', text: 'Home', route: '/' },
        {icon: 'mdi-calendar-today', text: 'Calendar', route: '/calendar' },
        {icon: 'mdi-view-day', text: 'Day', route: '/graph' },
        {icon: 'mdi-calendar', text: 'Chronological', route: '/chronological' },
        {icon: 'mdi-plus', text: 'Add', route: '/transactions/create' }
    ],

    selectedDate: moment(),

    budgets: [
      {
        month: 8,
        year: 2020,
        budget: 5000,
      },
      {
        month: 9,
        year: 2020,
        budget: 10000,
      },
      {
        month: 10,
        year: 2020,
        budget: 7500,
      },
    ],

    categories: [
      {
        id:1,
        name: 'Food'
      },
      {
        id:2,
        name: 'Transport'
      },
      {
        id:3,
        name: 'Education'
      },
      {
        id:4,
        name: 'Housing'
      },
      {
        id:5,
        name: 'Fun'
      }
    ],

    items: [
      {
        itemId: 14,
        categoryId: 1,
        dateCreated: moment(),
        date:  moment(),
        amount: 574.50,
        name: 'Breaf Fast',
        recurring: 'Daily',
        payment: 'Cash',
        color: 'blue',
        type: 'expense'
      },
      {
        itemId: 1,
        categoryId: 1,
        dateCreated: moment(),
        date:  moment().subtract(21, 'days'),
        amount: 574.50,
        name: 'Mega Shopping',
        recurring: 'Monthly',
        payment: 'Cash',
        color: 'blue',
        type: 'expense'
      },
      {
        itemId: 2,
        categoryId: null,
        dateCreated: moment(),
        date:  moment().subtract(22, 'days'),
        amount: 1000.00,
        name: 'OVS 1st Payment',
        recurring: null,
        payment: 'Cash',
        color: 'indigo',
        type: 'income'
      },
      {
        itemId: 3,
        categoryId: 1,
        dateCreated: moment(),
        date:  moment().subtract(11, 'days'),
        amount: 1000.00,
        name: 'Vacation',
        recurring: null,
        payment: 'Cash',
        color: 'indigo',
        type: 'expence'
      },
      {
        itemId: 4,
        categoryId: null,
        dateCreated: moment(),
        date:  moment().subtract(13, 'days'),
        amount: 10000.50,
        name: 'Pay Check',
        recurring: 'Monthly',
        payment: 'Check',
        color: 'blue',
        type: 'income'
      },
      {
        itemId: 5,
        categoryId: 2,
        dateCreated: moment(),
        date:  moment().subtract(10, 'days'),
        amount: 100.00,
        name: 'Catch a bike to Juma',
        recurring: null,
        payment: 'Cash',
        color: 'brown',
        type: 'expense'
      },
      {
        itemId: 6,
        categoryId: 3,
        dateCreated: moment(),
        date:  moment().subtract(10, 'days'),
        amount: 50.00,
        name: 'Buy bundles',
        recurring: 'Daily',
        payment: 'Mpesa',
        color: 'brown',
        type: 'expense'
      },
      {
        itemId: 7,
        categoryId: 4,
        dateCreated: moment(),
        date:  moment().subtract(13, 'days'),
        amount: 2000.00,
        name: 'Pay Rent',
        recurring: 'Monthly',
        payment: 'Mpesa',
        color: 'brown',
        type: 'expense'
      },
      {
        itemId: 8,
        categoryId: 4,
        dateCreated: moment(),
        date:  moment().subtract(13, 'days'),
        amount: 4000.00,
        name: 'Pay Overdue Rent',
        recurring: null,
        payment: 'Mpesa',
        color: 'brown',
        type: 'expense'
      },
      {
        itemId: 9,
        categoryId: 1,
        dateCreated: moment(),
        date:  moment().subtract(12, 'days'),
        amount: 1000.00,
        name: 'Refill Gas',
        recurring: null,
        payment: 'Cash',
        color: 'brown',
        type: 'expense'
      },
      {
        itemId: 10,
        categoryId: 3,
        dateCreated: moment(),
        date:  moment().subtract(12, 'days'),
        amount: 1500.00,
        name: 'Pay for webhosting services',
        recurring: 'Yearly',
        payment: 'Paypal',
        color: 'brown',
        type: 'expense'
      },
      {
        itemId: 11,
        categoryId: null,
        dateCreated: moment(),
        date:  moment().add(4, 'days'),
        amount: 2000.00,
        name: 'Epic Online Working',
        recurring: null,
        payment: 'Cash',
        color: 'brown',
        type: 'teal'
      },
      {
        itemId: 12,
        categoryId: null,
        dateCreated: moment(),
        date:  moment().add(4, 'days'),
        amount: 1500.00,
        name: 'Online Voting Sytem Last Payment',
        recurring: null,
        payment: 'Mpesa',
        color: 'purple',
        type: 'income'
      },
      {
        itemId: 13,
        categoryId: 4,
        dateCreated: moment(),
        date:  moment().add(5, 'days'),
        amount: 1500.00,
        name: 'Buy Chairs',
        recurring: null,
        payment: 'Cash',
        color: 'purple',
        type: 'expense'
      },
    ],

    transactions: [
        {
          item: 'income',
          date:  moment().subtract(10, 'days'),
          amount: 1750.00,
          repeat: 'none',
          category: 1,
          payment: 'Cash',
          description: 'Epic Online Website',
          color: 'blue'
        },
        {
          item: 'expenditure',
          date: moment().subtract(7, 'days'),
          amount: 50.00,
          repeat: 'none',
          category: 0,
          payment: 'Cash',
          description: 'Heavy Breakfast',
          color: 'indigo'
        },
        {
          item: 'income',
          date: moment().subtract(6, 'days'),
          amount: 50.00,
          repeat: 'month',
          category: 1,
          payment: 'M-PESA',
          description: 'Freelance with Maggy',
          color: 'cyan'
        },
        {
          item: 'expenditure',
          date: moment().subtract(4, 'days'),
          amount: 3500.00,
          repeat: 'year',
          category: 1,
          payment: 'paypaly',
          description: 'Web Hosting',
          color: 'teal'
        },
        {
          item: 'expenditure',
          date: moment().subtract(4, 'days'),
          amount: 100.00,
          repeat: 'day',
          category: 1,
          payment: 'Cash',
          description: 'Dinner',
          color: 'purple'
        },
    ]
  },

  mutations: {
    setSelectedDate: (state, date) => {
      state.selectedDate = date;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getUpcomingIncome: state => {

      const upcomingIncomes = state.items.filter(item => {
        return moment().isBefore(item.date) && item.type == 'income';
      });
      return upcomingIncomes.reduce((prev, next) => prev.date.isBefore(next.date));
    },

    getUpcomingExpense: state => {
      const upcomingExpenses = state.items.filter(item => {
        return moment().isBefore(item.date) && item.type == 'expense';
      })

      return upcomingExpenses.reduce((prev, next) => prev.date.isBefore(next.date));
    },
  }
});
