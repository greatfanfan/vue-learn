import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import '../plugins/elementui.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
// import axios from 'axios'
import service from './service'
import echarts from 'echarts'

Vue.use(ElementUI)

Vue.config.productionTip = false
// Vue.prototype.axios = axios
Vue.prototype.service = service
Vue.prototype.$echarts = echarts

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token')) {
    if (to.path !== '/login') {
      next('/login')
    } next()
  } next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
