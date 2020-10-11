import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import swal from 'sweetalert'

Vue.use(Vuex)

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
    orders: [],
    todaysIncome: {},
    yesterdaysIncome: {},
    thisWeekOrders: {},
    lastWeekOrders: {},
    thisYearsIncome: {},
    lastYearsIncome: {}
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
    addToCart (state, payload) {
      const isCart = state.carts.find((item) => {
        return item.id === payload.id
      })
      if (!isCart) {
        const data = payload
        data.quantity = 1
        state.carts.push(data)
      } else {
        state.carts = state.carts.filter((data) => {
          return data.id !== payload.id
        })
      }
    },
    setEmptyCart (state) {
      state.carts = []
    },
    setOrder (state, payload) {
      state.orders = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    setTodaysIncome (state, payload) {
      state.todaysIncome = payload
    },
    setYesterdaysIncome (state, payload) {
      state.yesterdaysIncome = payload
    },
    setThisWeekOrders (state, payload) {
      state.thisWeekOrders = payload
    },
    setLastWeekOrders (state, payload) {
      state.lastWeekOrders = payload
    },
    setThisYearsIncome (state, payload) {
      state.thisYearsIncome = payload
    },
    setLastYearsIncome (state, payload) {
      state.lastYearsIncome = payload
    }
  },
  actions: {
    interceptorsResponse (setex) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
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
        } else if (error.response.status === 403 && error.response.data.result.message === 'Email is Already Registered') {
          swal('Error!', 'Email is Already Registered', 'error')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Password must have at least 8 character!') {
          swal('Error!', 'Password must have at least 8 character!', 'error')
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
          .then((res) => {
            setex.commit('setProduct', res.data.result)
            setex.commit('setPagination', res.data.resultPage)
            resolve(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOrder (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_HISTORY_URL + `${payload || ''}`)
          .then((res) => {
            setex.commit('setOrder', res.data.result)
            resolve(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getTodaysIncome (setex) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_HISTORY_URL + 'date/todaysIncome')
          .then((res) => {
            setex.commit('setTodaysIncome', res.data.result[0].amount)
            resolve(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getYesterdaysIncome (setex) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_HISTORY_URL + 'date/yesterdaysIncome')
          .then((res) => {
            setex.commit('setYesterdaysIncome', res.data.result[0].amount)
            resolve(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getThisWeekOrders (setex) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_HISTORY_URL + 'date/thisWeekOrders')
          .then((res) => {
            setex.commit('setThisWeekOrders', res.data.result[0].orders)
            resolve(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getLastWeekOrders (setex) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_HISTORY_URL + 'date/lastWeekOrders')
          .then((res) => {
            setex.commit('setLastWeekOrders', res.data.result[0].orders)
            resolve(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getThisYearsIncome (setex) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_HISTORY_URL + 'date/thisYearsIncome')
          .then((res) => {
            setex.commit('setThisYearsIncome', res.data.result[0].amount)
            resolve(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getLastYearsIncome (setex) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_HISTORY_URL + 'date/lastYearsIncome')
          .then((res) => {
            setex.commit('setLastYearsIncome', res.data.result[0].amount)
            resolve(res.data.result)
          })
          .catch((err) => {
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
    todaysIncome (state) {
      return state.todaysIncome
    },
    yesterdaysIncome (state) {
      return state.yesterdaysIncome
    },
    thisWeekOrders (state) {
      return state.thisWeekOrders
    },
    lastWeekOrders (state) {
      return state.lastWeekOrders
    },
    thisYearsIncome (state) {
      return state.thisYearsIncome
    },
    lastYearsIncome (state) {
      return state.lastYearsIncome
    },
    user (state) {
      return state.user
    }
  },
  modules: {
  }
})
