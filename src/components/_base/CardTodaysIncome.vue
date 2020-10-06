<template>
  <div>
    <div class="todays-income">
      <div class="card-history-title">Todays's Income</div>
      <div class="card-history-value" v-if="todaysIncome < 1">Rp. 0</div>
      <div class="card-history-value" v-else>Rp. {{number ()}}</div>
      <div class="card-percentage" v-if="percentage () > 0">+{{percentage ()}}% Yesterday</div>
      <div class="card-percentage" v-else>{{percentage ()}}% Yesterday</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CardTodaysIncome',
  methods: {
    ...mapActions(['getTodaysIncome', 'getYesterdaysIncome']),
    number () {
      const n = this.todaysIncome
      return String(n).replace(/(.)(?=(\d{3})+$)/g, '$1.')
    },
    percentage () {
      return ((this.todaysIncome - this.yesterdaysIncome) / this.yesterdaysIncome * 100).toFixed(2)
    }
  },
  computed: {
    ...mapGetters(['todaysIncome', 'yesterdaysIncome'])
  },
  mounted () {
    this.getTodaysIncome()
    this.getYesterdaysIncome()
  }
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
