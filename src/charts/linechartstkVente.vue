<template>
<div id="chart">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
</template>

<script>
import axios from 'axios'
export default {
  data : ()=>{
    return{
      series: [{
              name: "",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: true
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Stock sortie par mois ' + new Date().getFullYear() + '/' + parseInt(new Date().getFullYear() + 1),
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'juill', 'Août', 'Sept','Oct','Nov','Déc'],
            }
          },

    }
  },
  
  created()
  {
    var run = axios.get(this.link() + 'chartsortie',this.cors())
    run.then(e=>{
        console.log(e.data)
      this.series[0].data = e.data
    }) 
    run.catch(e=>{
      console.log('eer')
    })
  }
}
</script>