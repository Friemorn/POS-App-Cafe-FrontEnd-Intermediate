<template>
  <div>
    <div class="years-income">
      <div class="card-history-title">This Year's Income</div>
      <div class="card-history-value" v-if="thisYearsIncome < 1">Rp. {{number ()}}</div>
      <div class="card-history-value" v-else>Rp. {{number ()}}</div>
      <div class="card-percentage" v-if="percentage () > 0">+{{percentage ()}}% Last Year</div>
      <div class="card-percentage" v-else>{{percentage ()}}% Last Year</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CardThisYearsIncome',
  methods: {
    ...mapActions(['getThisYearsIncome', 'getLastYearsIncome']),
    number () {
      const n = this.thisYearsIncome
      return String(n).replace(/(.)(?=(\d{3})+$)/g, '$1.')
    },
    percentage () {
      return ((this.thisYearsIncome - this.lastYearsIncome) / this.lastYearsIncome * 100).toFixed(2)
    }
  },
  computed: {
    ...mapGetters(['thisYearsIncome', 'lastYearsIncome'])
  },
  mounted () {
    this.getThisYearsIncome()
    this.getLastYearsIncome()
  }
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
