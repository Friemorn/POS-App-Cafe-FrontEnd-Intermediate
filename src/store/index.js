import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

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
    orders: [],
    total: []
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
        data.total = null
        state.carts.push(data)
      }
    },
    removeFromCart (state, payload) {
      state.carts = state.carts.filter((item) => {
        return item.id !== payload.id
      })
    },
    setEmptyCart (state) {
      state.carts = []
    },
    setTotal (state, payload) {
      state.total = payload
      console.log(payload)
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
          // this.$swal('Error!', 'Email Address is Wrong!', 'error')
          alert('Email Address is Wrong!')
          router.push('/')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Password is Wrong!') {
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          // this.$swal('Error!', 'Password is Wrong!', 'error')
          alert('Password is Wrong!')
          router.push('/')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Only Images with Extentions (jpeg/jpg/png) are Allowed') {
          // this.$swal('Error!', 'Only Images with Extentions (jpeg/jpg/png) are Allowed!', 'error')
          alert('Only Images with Extentions (jpeg/jpg/png) are Allowed')
        } else if (error.response.status === 403 && error.response.data.result.message === 'File Too Large') {
          // this.$swal('Error!', 'Cannot Upload File Because File Too Large', 'error')
          alert('Cannot Upload File Because File Too Large')
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
    logout () {
      return new Promise((resolve, reject) => {
        if (this.state.token !== null) {
          localStorage.removeItem('token')
        }
      })
    },
    getProduct (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4000/api/v1/product?${payload || ''}page=${this.state.currentPage}&limit=6`)
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
    total (state) {
      return state.total
    },
    select (state) {
      return state.select
    }
  },
  modules: {
  }
})
