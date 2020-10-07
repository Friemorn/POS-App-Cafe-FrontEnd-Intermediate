<template>
  <div class="product-list">
    <div class="cart-list" v-for="item in cart" :key="item.id">
      <div class="cart-img">
        <img id="img" :src="item.image" alt="img">
      </div>
      <div class="cart-quantity">
        <div class="cart-list-name">{{item.name}}</div>
        <div class="qty">
          <div class="cart-counter">
            <div class="minus" v-if="item.quantity > 1" @click="item.quantity--">-</div>
            <div class="minus" v-else>-</div>
            <div class="number">{{item.quantity}}</div>
            <div class="plus" @click="item.quantity++">+</div>
          </div>
          <div class="counter-price">
            <div class="cart-price">Rp. {{item.quantity * item.price}}</div>
          </div>
        </div>
        <div/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'CartList',
  methods: {
    ...mapMutations(['addToCart'])
  },
  computed: {
    ...mapGetters(['cart', 'total'])
  }
}
</script>

<style scoped>
.cart-list {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding-bottom: 30px;
  font-size: 16px;
}
.cart-list img {
    height: 100px;
    width: 120px;
}
.cart-list-name {
  height: 70px;
  font-size: 20px;
  font-weight: 600;
  padding-top: 5px;
}
.cart-img {
  height: 100px;
  width: 100px;
  flex: 1;
}
#img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.cart-quantity {
  flex: 2;
  box-sizing: border-box;
  padding-left: 10px;
}
.cart-counter {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.counter-price {
  flex: 1;
  font-weight: 600;
}
.qty {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cart-price {
  text-align: center;
  box-sizing: border-box;
}
.number {
  color: #82DE3A;
  height: 30px;
  width: 30px;
  border: 1px solid #82DE3A;
  text-align: center;
  line-height: 30px;
  font-weight: 700;
}
.minus,
.plus {
  color: #82DE3A;
  height: 30px;
  width: 30px;
  background-color: rgba(130, 222, 58, 0.2);
  border: 1px solid #82DE3A;
  text-align: center;
  line-height: 30px;
  font-weight: 700;
}
</style>
