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
        {icon: 'mdi-plus', text: 'Add', route: '/entries/create' }
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

    transactions: [
        {
          item: 'income',
          date:  moment().subtract(10, 'days'),
          amount: 1750.00,
          repeat: 'none',
          category: 1,
          payment: 'cash',
          description: 'Epic Online Website',
          color: 'blue'
        },
        {
          item: 'expenditure',
          date: moment().subtract(7, 'days'),
          amount: 50.00,
          repeat: 'none',
          category: 0,
          payment: 'cash',
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
          payment: 'cash',
          description: 'Dinner',
          color: 'purple'
        },
    ]
  },
  mutations: {
    setShowDrawer: state => {
      state.showDrawer = !state.showDrawer
    }
  },
  actions: {},
  modules: {}
});
