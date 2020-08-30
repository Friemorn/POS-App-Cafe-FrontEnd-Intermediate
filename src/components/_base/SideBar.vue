<template>
    <div class="sidebar">
      <router-link class="home" to="/home">
        <div class="eat">
          <img src="../../assets/img/fork.png" alt="eat">
        </div>
      </router-link>
      <router-link class="history" to="/history">
        <div class="hist">
          <img src="../../assets/img/clipboard.png" alt="hist">
        </div>
      </router-link>
      <div class="add" @click="$emit('launch-modaladd')">
        <img src="../../assets/img/add.png" alt="add">
      </div>
      <router-link class="product" to="/product">
        <div class="prod">
          <img src="../../assets/img/product-icon-png-21.jpg" alt="hist">
        </div>
      </router-link>
    </div>
</template>
<script>

export default {
  name: 'SideBar',
  props: ['launch-modaladd']
}
</script>

<style scoped>
.sidebar {
  width: 100px;
  height: 820px;
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
.prod {
  padding: 10px 5px;
  margin-bottom: 30px;
  text-align: center;
}
.eat:hover,
.hist:hover,
.add:hover,
.prod:hover {
  background-color: rgba(207, 207, 207, 0.6);
  border-radius: 20px;
}
.sidebar img {
  width: 40px;
  height: 40px;
}
</style>
