<template>
  <div class="container">
    <div class="login-title">LOGIN</div>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary" @click="handleLogin">Login</button>
    </form>
    <div class="register">
      Don't Have an Account? <b v-link="color" @click="register">Register Here!</b>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  directives: {
    link: {
      bind (el, binding) {
        console.log(el)
        console.log(binding)
        if (binding.value === 'blue') {
          el.style.color = '#007bff'
        }
      }
    }
  },
  data () {
    return {
      email: '',
      password: '',
      color: 'blue'
    }
  },
  methods: {
    handleLogin (e) {
      e.preventDefault()
      const data = {
        email: this.email,
        password: this.password
      }
      this.login(data)
        .then(() => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          this.$router.push('/home')
        })
    },
    register () {
      this.$emit('close')
      this.$emit('register')
    },
    ...mapActions(['login'])
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 400px;
  padding: 50px;
  background-color: white;
  border-radius: 5%;
  box-shadow: 0px 5px 50px rgba(0, 0, 0, 0.3);
}
.login-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(141, 141, 141, 0.3);
}
.register {
  margin-top: 30px;
}
</style>
