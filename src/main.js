import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'

import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueLodash, { name: 'custom', lodash: lodash })

Vue.use(VueKeycloakJs, {
  init: {
    // Use 'login-required' to always require authentication
    // If using 'login-required', there is no need for the router guards in router.js
    onLoad: 'check-sso'
  },
  config: {
    url: 'http://keycloak-eprochelpcenter.apps.us-east-1.starter.openshift-online.com/auth/',
    //clientId: 'helpcenter-c-dev',
    clientId: 'helpcenter-c-prod',
    realm: 'helpcenter'
  },
  onReady: (keycloak) => {
    console.log(`I wonder what Keycloak returns: ${keycloak}`)
    new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
}) 

