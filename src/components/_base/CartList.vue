<template>
    <div class="cart-list">
      <div class="cart-img">
        <img :src="image" alt="coffelatte">
      </div>
      <div class="cart-quantity">
        <div class="cart-list-name">{{name}}</div>
        <div class="qty">
          <div class="cart-counter">
            <div class="minus" @click="setMinus">-</div>
            <div class="number">{{countCartList}}</div>
            <div class="plus" @click="setPlus">+</div>
          </div>
          <div class="counter-price">
            <div class="cart-price">Rp. {{price}}</div>
          </div>
        </div>
        <div/>
      </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'CartList',
  props: ['name', 'image', 'price', 'id'],
  methods: {
    ...mapActions(['getProduct']),
    ...mapMutations(['setPlus', 'setMinus'])
  },
  computed: {
    ...mapGetters(['countCartList'])
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
  text-align: center;
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
