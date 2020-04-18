import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    updateData: {},
    role: ''
  },
  mutations: {
    changeLogin (state) {
      if (localStorage.token) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    },
    getRole (state, role) {
      state.role = role
    },
    getProduct (state, products) {
      state.products = products
    },
    update (state, product) {
      state.updateData = product
    },
    search (state, name) {
      state.products = state.products.filter(el => el.name.toLowerCase().includes(name))
    },
    buy (state, id) {
      state.updateData = state.products.find(el => el.id === id)
      state.updateData = {
        id: state.updateData.id,
        name: state.updateData.name,
        image_url: state.updateData.image_url,
        price: state.updateData.price,
        stock: state.updateData.stock,
        description: state.updateData.description
      }
      if (state.updateData.stock > 0) {
        state.updateData.stock--
      }
    }
  },
  actions: {
    getProduct (context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/',
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          context.commit('getProduct', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    remove (context, id) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/product/${id}/delete`,
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          console.log(data.data.message)
          context.dispatch('getProduct')
        })
        .catch(err => {
          console.log(err)
        })
    },
    update (context, form) {
      axios({
        method: 'put',
        url: `http://localhost:3000/product/${form.id}/update`,
        headers: {
          token: localStorage.token
        },
        data: {
          name: form.name,
          image_url: form.image,
          price: form.price,
          stock: form.stock,
          description: form.description
        }
      })
        .then(() => {
          console.log('Successfully updated data')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
