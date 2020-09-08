import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import swal from 'sweetalert'

Vue.use(Vuex)

// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`

export default new Vuex.Store({
  state: {
    pagination: null,
    currentPage: 1,
    selected: false,
    selectedFile: null,
    token: localStorage.getItem('token') || null,
    user: {},
    products: [],
    carts: [],
    orders: []
  },
  mutations: {
    setPagination (state, payload) {
      state.pagination = payload
    },
    setUser (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setProduct (state, payload) {
      state.products = payload
    },
    setSelect (state) {
      state.select = false
    },
    addToCart (state, payload) {
      const isCart = state.carts.find((item) => {
        return item.id === payload.id
      })
      if (!isCart) {
        const data = payload
        data.quantity = 1
        state.carts.push(data)
      }
    },
    removeFromCart (state, payload) {
      state.carts = state.carts.filter((item) => {
        return item.id !== payload.id
      })
    },
    minQty (state, payload) {
      const isCart = state.carts.find((item) => item.id === payload.id)
      if (isCart.quantity > 1) {
        isCart.quantity--
      } else {
        state.carts.splice(state.cart.indexOf(isCart, 1))
      }
    },
    plusQty (state, payload) {
      const isCart = state.carts.find((item) => item.id === payload.id)
      isCart.quantity++
    },
    setEmptyCart (state) {
      state.carts = []
    },
    setOrder (state, payload) {
      state.orders = payload
    },
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    interceptorsResponse (setex) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error.response)
        if (error.response.status === 401 && error.response.data.result.message === 'Token is Invalid') {
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          // swal('Error!', "Don't Edit Token", 'error')
          router.push('/')
        } else if (error.response.status === 401 && error.response.data.result.message === 'Token is Expired') {
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          swal('Error!', 'Session is Ended', 'error')
          router.push('/')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Email Not Found!') {
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          swal('Error!', 'Email Address is Wrong!', 'error')
          router.push('/')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Password is Wrong!') {
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          swal('Error!', 'Password is Wrong!', 'error')
          router.push('/')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Only Images with Extentions (jpeg/jpg/png) are Allowed') {
          swal('Error!', 'Only Images with Extentions (jpeg/jpg/png) are Allowed!', 'error')
        } else if (error.response.status === 403 && error.response.data.result.message === 'File Too Large') {
          swal('Error!', 'Cannot Upload File Because File Too Large', 'error')
        }
        return Promise.reject(error)
      })
    },
    interceptorsRequest (setex) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${setex.state.token}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    login (setex, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_USER_URL + 'login', payload)
          .then((res) => {
            console.log(res)
            setex.commit('setUser', res.data.result)
            localStorage.setItem('token', res.data.result.token)
            // axios.defaults.headers.common.Authorization = `Bearer ${res.data.result.token}`
            resolve(res.data.result[0])
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    logout () {
      return new Promise((resolve, reject) => {
        if (this.state.token !== null) {
          localStorage.removeItem('token')
        }
      })
    },
    getProduct (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_PRODUCT_URL + `?${payload || ''}page=${this.state.currentPage}&limit=6`)
        // axios.get(`http://localhost:4000/api/v1/product?${payload || ''}&limit=6`)
          .then((res) => {
            setex.commit('setProduct', res.data.result)
            setex.commit('setPagination', res.data.resultPage)
            resolve(res.data.result)
          })
          .reject((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOrder (setex) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_HISTORY_URL)
          .then((res) => {
            setex.commit('setOrder', res.data.result)
            resolve(res.data.result)
          })
          .reject((err) => {
            console.log(err)
            reject(err)
          })
      })
    }
  },
  getters: {
    pagination (state) {
      return state.pagination
    },
    countCart (state) {
      return state.carts.length
    },
    isLogin (state) {
      return state.token !== null
    },
    products (state) {
      return state.products
    },
    cart (state) {
      return state.carts
    },
    order (state) {
      return state.orders
    },
    select (state) {
      return state.select
    }
  },
  modules: {
  }
})
