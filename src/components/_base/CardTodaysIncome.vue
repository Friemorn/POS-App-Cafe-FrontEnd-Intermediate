<template>
  <div>
    <div class="todays-income">
      <!-- <img src="/../../assets/img/rectangle - todays income.png" alt="ti"> -->
      <div class="card-history-title">Todays's Income</div>
      <div class="card-history-value">Rp. 1.000.000</div>
      <div class="card-percentage">+2% Yesterday</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTodaysIncome'
}
</script>

<style scoped>
  .todays-income {
  height: 250px;
  width: 100%;
  border-radius: 10px;
  padding: 50px 30px;
  margin-bottom: 30px;
  background: linear-gradient(285.38deg, #FBB2B4 30.05%, rgba(255, 143, 178, 0) 133.19%);
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
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
