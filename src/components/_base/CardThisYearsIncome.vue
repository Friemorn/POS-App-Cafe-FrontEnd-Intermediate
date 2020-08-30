<template>
  <div>
    <div class="years-income">
      <!-- <img src="assets/img/rectangle - this years income.png" alt="tyi"> -->
      <div class="card-history-title">This Year's Income</div>
      <div class="card-history-value">Rp. 100.000.000.000</div>
      <div class="card-percentage">+10% Last Year</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardThisYearsIncome'
}
</script>

<style scoped>
.years-income {
  height: 250px;
  width: 100%;
  border-radius: 10px;
  padding: 50px 30px;
  margin-bottom: 30px;
  background: linear-gradient(285.38deg, #AB84C8 30.05%, rgba(241, 201, 236, 0) 133.19%);
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
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
