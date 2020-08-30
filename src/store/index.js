import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`

export default new Vuex.Store({
  state: {
    countCart: 0,
    countCartList: 1,
    selectedFile: null,
    token: localStorage.getItem('token') || null,
    user: {},
    products: [],
    productList: {},
    orders: [],
    empty: true
  },
  mutations: {
    setCount (state, payload) {
      state.countCart = payload
    },
    setMinus (state) {
      state.countCartList--
    },
    setPlus (state) {
      state.countCartList++
    },
    setUser (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setProduct (state, payload) {
      state.products = payload
    },
    setProductList (state, payload) {
      state.productList = payload
    },
    setOrder (state, payload) {
      state.orders = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    setEmpty (state, payload) {
      state.empty = payload
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
          alert("Don't Edit Token")
          router.push('/')
        } else if (error.response.status === 401 && error.response.data.result.message === 'Token is Expired') {
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          alert('Session is Ended')
          router.push('/')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Email Not Found!') {
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          alert('Email Address is Wrong!')
          router.push('/')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Password is Wrong!') {
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          alert('Password is Wrong!')
          router.push('/')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Email is Already Registered') {
          alert('Email is Already Registered!')
          router.push('/')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Only Images with Extentions (jpeg/jpg/png) are Allowed') {
          alert('Only Images with Extentions (jpeg/jpg/png) are Allowed')
        } else if (error.response.status === 403 && error.response.data.result.message === 'File Too Large') {
          alert('Cannot Upload File Beacuse File Too Large')
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
        axios.post('http://localhost:4000/api/v1/user/login', payload)
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
    getProduct (setex) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/v1/product?page=1&limit=12')
          .then((res) => {
            setex.commit('setProduct', res.data.result)
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
        axios.get('http://localhost:4000/api/v1/history')
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
    countCart (state) {
      return state.countCart
    },
    countCartList (state) {
      return state.countCartList
    },
    isLogin (state) {
      return state.token !== null
    },
    products (state) {
      return state.products
    },
    productLists (state) {
      return state.productList
    },
    orders (state) {
      return state.orders
    },
    emptyCart (state) {
      return state.empty
    }
  },
  modules: {
  }
})
