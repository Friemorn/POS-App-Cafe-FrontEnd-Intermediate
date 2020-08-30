<template>
  <div class="contain">
    <router-view/>
      <div class="main-header">
        <NavbarHistory/>
      </div>
        <div class="history-content">
          <SideBar/>
          <div class="history-list">
            <div class="card-history">
              <div class="cti"><CardTodaysIncome/></div>
              <div class="co"><CardOrders/></div>
              <div class="ctyi"><CardThisYearsIncome/></div>
            </div>
            <div class="revenue">
              <CardRevenue/>
            </div>
            <div class="recent-order">
              <CardRecentOrder :order = "orders" @get-data = "getOrder"/>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import NavbarHistory from '../../../components/_base/NavbarHistory'
import SideBar from '../../../components/_base/SideBar'
import CardTodaysIncome from '../../../components/_base/CardTodaysIncome'
import CardOrders from '../../../components/_base/CardOrders'
import CardThisYearsIncome from '../../../components/_base/CardThisYearsIncome'
import CardRevenue from '../../../components/_base/CardRevenue'
import CardRecentOrder from '../../../components/_base/CardRecentOrder'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'History',
  components: {
    NavbarHistory,
    SideBar,
    CardTodaysIncome,
    CardOrders,
    CardThisYearsIncome,
    CardRevenue,
    CardRecentOrder
  },
  methods: {
    ...mapActions(['getOrder'])
  },
  computed: {
    ...mapGetters(['orders'])
  },
  mounted () {
    this.getOrder()
  }
}
</script>

<style scoped>
/* Home Container */
.contain {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: Arial, Verdana, sans-serif;
  font-size: 20px;
  background-color: rgba(190, 195, 202, 0.3);
}
.history-header{
  width: 100%;
}
.history-menu {
  width: 5%;
}
.history-title {
  width: 95%;
  text-align: center;
  padding: 10px;
}
.history-content {
  width: 100%;
  height: 820px;
  overflow: auto;
  display: flex;
  flex-direction: row;
  background-color: rgb(245, 245, 245);
  box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.2);
}
.history-list {
  width: auto;
  width: 100%;
  margin: 30px 50px 0 150px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
}
.card-history {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
}
.cti, .co, .ctyi {
  flex: 1;
  margin: 10px;
}
.revenue {
  width: 100%;
  padding: 20px;
  margin-bottom: 80px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
}
.recent-order {
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
}
</style>
