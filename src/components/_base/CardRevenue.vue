<template>
  <div>
    <table id="table-revenue-header" border="0" cellspacing="0" cellpadding="5">
      <tr>
        <td class="revenue-title">Revenue</td>
        <td class="table-right">
          <select @change="history" name="category" class="drop-down" id="category" v-model="month">
            <option value="0">Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </td>
      </tr>
    </table>
    <LineChart :width="300" :height="100" :chart-data="chartData"/>
  </div>
</template>

<script>
import axios from 'axios'
import LineChart from './Chart.js'

export default {
  name: 'CardRevenue',
  components: {
    LineChart
  },
  data () {
    return {
      chartData: null,
      month: 1,
      time: [],
      tmonth: [],
      // lmonth: [],
      tmpArray: ''
    }
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  },
  methods: {
    getChartThisMonth () {
      axios.get(process.env.VUE_APP_HISTORY_URL + `month/${this.month}`)
        .then(res => {
          this.tmpArray = res.data.result
          this.tmonth = []
          this.time = []
          for (let i = 0; i < this.tmpArray.length; i++) {
            this.tmonth.push(this.tmpArray[i].amount)
            this.time.push(this.tmpArray[i].date)
          }
          this.fillData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // getChartLastMonth () {
    //   axios.get(process.env.VUE_APP_HISTORY_URL + `month/${this.month - 1}`)
    //     .then(res => {
    //       this.tmpArray = res.data.result
    //       this.tmonth = []
    //       this.time = []
    //       for (let i = 0; i < this.tmpArray.length; i++) {
    //         this.lmonth.push(this.tmpArray[i].amount)
    //         this.time.push(this.tmpArray[i].date)
    //       }
    //       this.fillData()
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    history () {
      this.getChartThisMonth()
      // this.getChartLastMonth()
    },
    fillData () {
      this.chartData = {
        // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        labels: this.time,
        datasets: [
          {
            label: 'Month ' + this.month,
            backgroundColor: 'rgba(251, 178, 180, 0.2)',
            borderColor: '#FBB2B4',
            pointBackgroundColor: '#FBB2B4',
            borderWidth: 3,
            pointBorderColor: '#FBB2B4',
            data: this.tmonth
          // },
          // {
          //   label: 'Last Month',
          //   backgroundColor: 'rgba(41, 223, 255, 0.2)',
          //   borderColor: '#29DFFF',
          //   pointBackgroundColor: '#29DFFF',
          //   borderWidth: 3,
          //   pointBorderColor: '#29DFFF',
          //   data: this.lmonth
          }
        ]
      }
    }
  },
  mounted () {
    this.getChartThisMonth()
    // this.fillData()
    // this.getHistory()
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
  width: 100px;
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
