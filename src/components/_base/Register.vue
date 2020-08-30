<template>
  <div class="container">
    <div class="register-title">REGISTER</div>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput">First Name</label>
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Your First Name" v-model="firstName">
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Last Name</label>
        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Your Last Name" v-model="lastName">
      </div>
      <button type="submit" class="btn btn-primary" @click="addUser">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    addUser () {
      axios.post('http://localhost:4000/api/v1/user/register', {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      })
        .then((res) => {
          alert('User Added Successfully')
          this.$emit('close')
          this.$emit('login')
        })
        .catch((res) => {
          // alert('User Failed to Add')
        })
    }
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
.register-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(141, 141, 141, 0.3);
}
</style>
