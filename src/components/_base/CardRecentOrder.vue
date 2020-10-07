<template>
  <div>
    <div class="recent-header">
      <table id="table-recent-header" border="0" cellspacing="0" cellpadding="5">
        <tr>
          <td class="ro">Recent Order</td>
          <td class="table-right">
            <select name="today" class="drop-down" @change="setData">
              <option value="">Recent By</option>
              <option value="today">Today</option>
              <option value="thisMonth">This Month</option>
              <option value="thisYear">This Year</option>
            </select>
          </td>
        </tr>
      </table>
    </div>
    <div class="recent-value">
      <table id="table-recent-value" border="0" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
          <th>INVOICES</th>
          <th>CASHIER</th>
          <th>DATE</th>
          <th>ORDERS</th>
          <th>AMOUNT</th>
        </tr>
        </thead>
        <tbody>
          <tr class="table-value" v-for="item in orders" :key="item.idHistory">
            <td>{{item.invoices}}</td>
            <td>{{item.cashier}}</td>
            <td>{{item.date}}</td>
            <td>{{item.orders}}</td>
            <td>{{item.amount}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CardRecentOrder',
  props: ['orders', 'get-data'],
  methods: {
    ...mapActions(['getOrder']),
    setData (e) {
      const url = `date/${e.target.value}`
      this.getOrder(url)
    }
  }
}
</script>

<style scoped>
#table-recent-header,
#table-recent-value {
  width: 100%;
  padding: 20px;
}
.recent-value {
  height: 400px;
  width: 100%;
  overflow-x: auto;
}
.table-recent-value {
  font-size: 10px;
}
thead th {
  border-bottom: 1px solid #CECECE;
}
.table-value {
  color: #CECECE;
  font-weight: 500;
}
.drop-down {
  font-size: 15px;
  height: 27px;
  width: 100px;
  background-color: #CECECE;
  border-radius: 10px;
  border: none;
}
.table-right {
  text-align: right;
}
.ro {
  font-size: 25px;
  font-weight: 600;
}
</style>
