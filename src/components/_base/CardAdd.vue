<template>
  <div class="card-product">
    <div class="card-image">
      <div class="img-product">
        <img id="img-product" :src="image" alt="img-product" @click="selectedCart"/>
      </div>
      <div v-show="select" class="checklist" @click="unselectedCart">
        <img id="select" src="../../assets/img/tick.png" alt="select">
      </div>
    </div>
    <div class="card-box">
      <div class="card-name">{{name}}</div>
      <div class="card-price">{{price}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardAdd',
  props: ['name', 'image', 'price', 'id'],
  data () {
    return {
      select: false
    }
  },
  methods: {
    selectedCart () {
      this.select = true
      this.emptyCart = false
      this.countCart++
    },
    unselectedCart () {
      this.select = false
      this.emptyCart = true
      this.countCart--
    },
    computed: {
      ...mapGetters(['countCart', 'emptyCart', 'productList'])
    }
  }
}
</script>

<style scoped>
.card-product {
  margin: 10px;
  height: 247px;
  width: 250px;
  display: flex;
  flex-direction: column;
}
.card-box{
  font-weight: 500;
}
.card-image, #img-product {
    height: 200px;
    width: 250px;
    background-size: cover;
}
.card-image {
  position: relative;
}
.checklist {
  height: 200px;
  width: 250px;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  margin-top: -200px;
}
#select {
  height: 50px;
  width: 50px;
  margin: 70px 0 0 100px;
}
.card-price {
  font-weight: 600;
}
</style>
