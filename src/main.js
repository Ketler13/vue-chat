import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
// import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#d1c4e9',
  },
});

new Vue({
  // router,
  store,
  render: h => h(App),
}).$mount('#app');
