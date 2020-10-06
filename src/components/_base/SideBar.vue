<template>
    <div class="sidebar">
      <router-link class="home" to="/home">
        <div class="eat">
          <img src="../../assets/img/fork.png" alt="eat">
        </div>
      </router-link>
      <router-link class="history" to="/history">
        <div class="hist" v-show="user.roleId === 1">
          <img src="../../assets/img/clipboard.png" alt="hist">
        </div>
      </router-link>
      <div class="add" @click="$emit('launch-modaladd')" v-show="user.roleId === 1">
        <img src="../../assets/img/add.png" alt="add">
      </div>
      <router-link class="product" to="/product">
        <div class="prod" v-show="user.roleId === 1">
          <img src="../../assets/img/product-icon-png-21.jpg" alt="hist">
        </div>
      </router-link>
      <div class="logout" @click="handleLogout">
        <div class="out">
          <img src="../../assets/img/logout.png" alt="lgt">
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SideBar',
  props: ['launch-modaladd'],
  methods: {
    ...mapActions(['logout']),
    handleLogout () {
      this.$swal.fire({
        title: 'Are you sure want to logout?',
        text: 'You will be return to the landing page',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then((result) => {
        if (result.value) {
          this.logout()
          this.$router.go(0)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
.sidebar {
  width: 100px;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  box-shadow: 2px 0px 7px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 2;
}
.eat,
.hist,
.add,
.prod,
.out {
  padding: 10px 5px;
  margin-bottom: 30px;
  text-align: center;
}
.eat:hover,
.hist:hover,
.add:hover,
.prod:hover,
.out:hover {
  background-color: rgba(207, 207, 207, 0.6);
  border-radius: 20px;
}
.sidebar img {
  width: 40px;
  height: 40px;
}
</style>
