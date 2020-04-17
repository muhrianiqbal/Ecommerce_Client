import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    isLogin: false,
    product: []
  },
  mutations: {
    changeLogin () {
      if (localStorage.token) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    }
  },
  actions: {
    getProduct () {
      axios({
        method: 'get',
        url: 'localhost:3000/',
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          this.product = data
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
