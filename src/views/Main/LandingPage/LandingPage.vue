<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <div class="container">
        <a class="navbar-brand text-light" href="">UFOCAFE</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ml-auto">
            <a class="nav-item nav-link text-light" href="#">About</a>
            <a class="nav-item nav-link text-light" href="#">Contact</a>
            <a class="nav-item nav-link text-light" href="#">Store</a>
            <a class="nav-item nav-link text-light" href="#">Social Media</a>
          </div>
        </div>
      </div>
    </nav>

    <article class="content">
      <div class="container">
        <div class="login d-inline-flex">
          <Login v-show= "showLogin" @close = "loginOff" @register = "registerOn"/>
          <Register v-show= "showRegister" @close = "registerOff" @login = "loginOn"/>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Login from '../../../components/_base/Login'
import Register from '../../../components/_base/Register'

export default {
  name: 'LandingPage',
  components: {
    Login,
    Register
  },
  data () {
    return {
      showLogin: true,
      showRegister: false
    }
  },
  methods: {
    loginOn () {
      this.showLogin = true
    },
    loginOff () {
      this.showLogin = false
    },
    registerOn () {
      this.showRegister = true
    },
    registerOff () {
      this.showRegister = false
    }
  }
}
</script>

<style scoped>
/* Desktop */
/* .jumbotron {
    height: 450px;
    background-image: url('../../../assets/img/coffee.jpg');
    background-size: cover;
    background-position: 0 -350px;
    background-repeat: no-repeat;
    color: white;
    padding-top: 50px;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5)
}
.nav-link {
    text-transform: uppercase;
}
.jumbotron .display-4 {
    font-size: 60px;
}
.jumbotron .lead {
    font-size: 30px;
}
.services {
    padding: 30px;
    margin-top: -150px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5)
}
.services img {
    height: 80px;
    margin: 10px;
} */
.content {
  height: 663px;
  background-image: url('../../../assets/img/coffee.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.login {
  margin: 60px 0 0 0;
}
.navbar {
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
}

/* Tablet */
@media(max-width: 764px) {
    .jumbotron {
        height: 350px;
        background-position: 0 -150px;
        padding-top: 20px;
    }
    .jumbotron .display-4 {
        font-size: 40px;
    }
    .jumbotron .lead {
        font-size: 20px;
    }
    .services {
        padding: 20px;
        margin-top: -100px;
        background-color: white;
        border-radius: 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5)
    }
    .services img {
        height: 70px;
        margin: 10px;
    }
}

/* Handphone */
@media (max-width: 576px) {
    .jumbotron {
        height: 350px;
        background-position: 0 0px;
        padding-top: 20px;
    }
    .jumbotron .display-4 {
        font-size: 40px;
    }
    .jumbotron .lead {
        font-size: 20px;
    }
    .services {
        padding: 20px 80px;
        margin-top: -150px;
        background-color: white;
        border-radius: 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5)
    }
    .services h4 {
        font-size: 20px;
    }
    .services p {
        font-size: 15px;
    }
    .services img {
        height: 70px;
        margin: 10px;
    }
}
</style>
