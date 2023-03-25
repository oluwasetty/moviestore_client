import Vue from "vue";
import App from './App.vue'
import router from "./router"
import store from './store/index'
import Global from './components/global'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js'
import CxltToastr from "cxlt-vue2-toastr"

var toastrConfigs = {
  position: 'bottom full width',
  showDuration: 500,
  hideDuration: 500,
  progressBar: false,
  closeButton: true,
  timeOut: 5000,
  delay: 0,
  successColor: '#28a745',
  infoColor: '#e81a1c',
  showMethod: 'fadeInUp',
  hideMethod: 'fadeOutDown',
}

Vue.use(CxltToastr, toastrConfigs)
Vue.use(Global)

store.watch(
  (state, getters) => getters.notification,
  (newValue, oldValue) => {
    if (newValue.status === 'success') {
      Vue.prototype.$toast.success({
        title: "Success",
        message: newValue.message,
        delay: 0
      });
    }
    if (newValue.status === 'error') {
      Vue.prototype.$toast.error({
        title: "Error",
        message: newValue.message,
        delay: 0
      });
    }
  },
);

new Vue({
    render: h => h(App),
    router,
    store
  }).$mount("#app");
