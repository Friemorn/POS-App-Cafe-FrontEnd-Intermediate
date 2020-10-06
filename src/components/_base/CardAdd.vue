<template>
  <div class="card-product">
    <div class="card-image" @click="selectedProduct">
      <div class="img-product">
        <img id="img" :src="image" alt="img-product"/>
      </div>
      <div v-show="active ? 'active':'' " class="checklist">
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
import { mapMutations } from 'vuex'

export default {
  name: 'CardAdd',
  props: ['name', 'image', 'price', 'id', 'active'],
  data () {
    return {
      select: false
    }
  },
  methods: {
    ...mapMutations(['addToCart']),
    selectedProduct () {
      this.addToCart({
        name: this.name,
        image: this.image,
        price: this.price,
        id: this.id
      })
    }
  }
}
</script>

<style scoped>
.card-product {
  margin: 10px 10px 10px 10px;
  height: 255px;
  width: 250px;
  display: flex;
  flex-direction: column;
}
.card-box{
  font-weight: 500;
}
.img-product {
  height: 200px;
  width: 250px;
  cursor: pointer;
}
#img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
