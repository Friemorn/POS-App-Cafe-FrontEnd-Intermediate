<template>
    <div class="container-chart">
      <select @change="history" name="category" id="category" v-model="Category" >
        <option v-for="(category, index) in categories" :key="index" v-bind:value="category">{{category}}</option>
      </select>
      <LineChart :chart-data="datacollection"></LineChart>
    </div>
</template>

<script>
// import axios from 'axios'
// import LineChart from 'chart.js'
export default {
  name: 'Chart',
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null,
      categories: ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember'],
      Category: '',
      loaded: false,
      time: [],
      tmonth: [],
      lmonth: [10, 30, 0, 35, 38, 10, 29, 20, 35],
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
  mounted () {
    this.getHistory()
  },
  methods: {
    history () {
      this.getHistory()
    },
    getHistory () {
      if (this.Category === 'januari') {
        this.Category = '01'
      } else if (this.Category === 'februari') {
        this.Category = '02'
      } else if (this.Category === 'maret') {
        this.Category = '03'
      } else if (this.Category === 'april') {
        this.Category = '04'
      } else if (this.Category === 'mei') {
        this.Category = '05'
      } else if (this.Category === 'juni') {
        this.Category = '06'
      } else if (this.Category === 'juli') {
        this.Category = '07'
      } else if (this.Category === 'agustus') {
        this.Category = '08'
      } else if (this.Category === 'september') {
        this.Category = '09'
      } else if (this.Category === 'oktober') {
        this.Category = '10'
      } else if (this.Category === 'november') {
        this.Category = '11'
      } else if (this.Category === 'desember') {
        this.Category = '12'
      }
      axios.get('http://localhost:4000/api/v1/history/?mo=' + this.Category)
        .then(res => {
          console.log(res.data.result)
          this.tmpArray = res.data.result
          this.tmonth = []
          this.time = []
          for (let i = 0; i < this.tmpArray.length; i++) {
            this.tmonth.push(this.tmpArray[i].amount)
            this.time.push(this.tmpArray[i].month)
          }
          this.fillData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    fillData () {
      this.datacollection = {
        labels: this.time,
        datasets: [
          {
            label: 'This Month',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#FFB8C6',
            pointBackgroundColor: '#FFB8C6',
            borderWidth: 1,
            pointBorderColor: '#FFB8C6',
            data: this.tmonth
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.container-chart {
    width: 100%;
    margin: 10px auto;
}
</style>
