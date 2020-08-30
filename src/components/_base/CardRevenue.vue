<template>
  <div>
    <table id="table-revenue-header" border="0" cellspacing="0" cellpadding="5">
      <tr>
        <td class="revenue-title">Revenue</td>
        <td class="table-right">
          <select name="month" class="drop-down">
            <option value="Today">Month</option>
          </select>
        </td>
      </tr>
    </table>
    <img src="../../assets/img/Chart.png" alt="chart">
  </div>
</template>

<script>
export default {
  name: 'CardRevenue'
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
