<template>
  <div>
    <table id="table-revenue-header" border="0" cellspacing="0" cellpadding="5">
      <tr>
        <td class="revenue-title">Revenue</td>
        <td class="table-right">
          <select name="month" class="drop-down">
            <option value="Today">Month</option>
            <option value="Today">January</option>
            <option value="Today">February</option>
            <option value="Today">March</option>
            <option value="Today">April</option>
            <option value="Today">May</option>
            <option value="Today">June</option>
            <option value="Today">July</option>
            <option value="Today">August</option>
            <option value="Today">September</option>
            <option value="Today">October</option>
            <option value="Today">November</option>
            <option value="Today">December</option>
          </select>
        </td>
      </tr>
    </table>
    <!-- <Chart/> -->
  </div>
</template>

<script>
// import Chart from '../_base/Chart'

export default {
  name: 'CardRevenue',
  components: {
    // Chart
  }
}
</script>

<style scoped>
#table-revenue-header {
  width: 100%;
  padding: 20px;
}
div.revenue img {
  width: 100%;
  border-radius: 20px;
}
.drop-down {
  font-size: 15px;
  height: 27px;
  width: 70px;
  background-color: #CECECE;
  border-radius: 10px;
  border: none;
}
.table-right {
  text-align: right;
}
.revenue-title {
  font-size: 25px;
  font-weight: 600;
}
</style>
