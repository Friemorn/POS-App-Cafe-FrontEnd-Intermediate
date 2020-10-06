<template>
  <div>
    <div class="orders">
      <div class="card-history-title">Orders</div>
      <div class="card-history-value" v-if="thisWeekOrders < 1">{{number ()}}</div>
      <div class="card-history-value" v-else>{{number ()}}</div>
      <div class="card-percentage" v-if="percentage () > 0">+{{percentage ()}}% Last Week</div>
      <div class="card-percentage" v-else>{{percentage ()}}% Last Week</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CardOrders',
  methods: {
    ...mapActions(['getThisWeekOrders', 'getLastWeekOrders']),
    number () {
      const n = this.thisWeekOrders
      return String(n).replace(/(.)(?=(\d{3})+$)/g, '$1.')
    },
    percentage () {
      return ((this.thisWeekOrders - this.lastWeekOrders) / this.lastWeekOrders * 100).toFixed(2)
    }
  },
  computed: {
    ...mapGetters(['thisWeekOrders', 'lastWeekOrders'])
  },
  mounted () {
    this.getThisWeekOrders()
    this.getLastWeekOrders()
  }
}
</script>

<style scoped>
.orders {
  height: 250px;
  width: 100%;
  border-radius: 10px;
  padding: 50px 30px;
  margin-bottom: 30px;
  background: linear-gradient(285.38deg, #29DFFF 30.05%, rgba(41, 223, 255, 0) 133.19%);
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
}
img {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: -5;
}
.card-history-title,
.card-percentage {
    font-weight: 500;
    margin-bottom: 10px;
}
.card-history-value {
    font-size: 35px;
    margin-bottom: 10px;
}
</style>
