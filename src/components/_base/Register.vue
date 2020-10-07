<template>
  <div class="container">
    <div class="register-title">REGISTER</div>
    <form>
      <div class="form-group">
        <label for="formGroupExampleInput">First Name</label>
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Your First Name" v-model="firstName">
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Last Name</label>
        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Your Last Name" v-model="lastName">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
        <label class="form__label">Password</label>
        <input type="password" class="form__input form-control" placeholder="Password" v-model.trim="$v.password.$model"/>
      </div>
      <div class="error" v-if="!$v.password.required">Password is required!</div>
      <div class="error" v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} character!</div>
      <div class="form-group" :class="{ 'form-group--error': $v.repeatPassword.$error }">
        <label class="form__label">Repeat password</label>
        <input type="password" class="form__input form-control" placeholder="Password" v-model.trim="$v.repeatPassword.$model"/>
      </div>
      <div class="error" v-if="!$v.repeatPassword.sameAsPassword">Passwords must be identical.</div>
      <tree-view :data="$v" :options="{rootObjectKey: '$v', maxDepth: 2}"></tree-view>
      <button type="submit" class="btn btn-primary" @click="addUser">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: ''
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    addUser () {
      axios.post(process.env.VUE_APP_USER_URL + 'register', {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      })
        .then((res) => {
          this.$swal('Register Success', 'User Added Successfully', 'success')
        })
        .catch((res) => {
        })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 400px;
  padding: 20px;
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
.btn {
  margin: 20px 0 0 130px;
}
.error {
  color: red;
}
</style>
