<template>
  <div>
    <div class="orders">
      <!-- <img src="/../../assets/img/rectangle - orders.png" alt="o"> -->
      <div class="card-history-title">Orders</div>
      <div class="card-history-value">3.270</div>
      <div class="card-percentage">+5% Last Week</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardOrders'
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
