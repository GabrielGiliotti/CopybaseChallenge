<script lang="ts">
  import { doRequest } from "../http/index";
  
  const url = 'http://localhost:3000/metricas/';

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Line } from 'vue-chartjs'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  
  export default {
    name: 'LineChart',

    components: { Line },
    
    props: {
      showButtons: { type: Boolean },
      showCharts: { type: Boolean },
    },

    data() {
      return {
        control: true,
        chartData: {
          labels: [] as string[],
          datasets: [{
            axis: 'y',
            label: 'Monthly Churn Rate (%) - 2022',
            data: [] as number[],
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        },
        chartOptions: {
          responsive: true,
        },
      }
    },

    watch: {
      showCharts: function() {
        this.updateChartData(6);
        this.control = false;
      }
    },
     
    methods: {
      async resetChartData() {
        return this.chartData = {
          labels: [] as string[],
          datasets: [{
            axis: 'y',
            label: 'Monthly Churn Rate (%) - 2022',
            data: [] as number[],
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        }
      },

      async updateChartData(queryValue: number) {

        this.chartData = await this.resetChartData();

        const headers = { 'Access-Control-Allow-Origin': '*' };

        const resultChurn = await doRequest(url + "churn-rate", "GET", headers, queryValue, null);

        setTimeout(() => {
          this.chartData.labels = resultChurn.labels;
          this.chartData.datasets[0].data = resultChurn.data;
        }, 250);
      },
    }
  }
</script>

<template>
  <div class="borda-geral" :style="[!showButtons ? {'min-height':'100px'} : {'min-height': '650px'}]">
    <div class="buttons">
      <button class="button" :disabled='!showButtons' @click="updateChartData(3)" >
          Churn Rate 3 Meses 
      </button>
      <button class="button" :disabled='!showButtons' @click="updateChartData(6)" >
          Churn Rate 6 Meses 
      </button>
      <button class="button" :disabled='!showButtons' @click="updateChartData(9)" >
          Churn Rate 9 Meses 
      </button>
      <button class="button" :disabled='!showButtons' @click="updateChartData(12)" >
          Churn Rate 12 Meses 
      </button>
    </div>
    <br>
    <div v-if="chartData.datasets[0].data.length" class="wrapper"> 
      <Line :options="chartOptions"
            :data="chartData"/>
      <br>
      <div>
        * Churn Rate acima de 100% indica que houveram mais cancelamentos que usuarios ativos
      </div>
    </div>
    <div v-else-if="control">
      Grafico de <strong>Linhas</strong>
    </div>

  </div>
</template>

<style scoped>
.borda-geral {
  border: 1px dashed black;
  border-radius: 0.5rem;
  text-align: center;
  margin: auto;
  width: 900px;
  padding: 2rem;
  flex-direction: column;
  display: flex;
  gap: 1rem;
  background-color: white;
}

.wrapper {  
  border: 1px dashed lightgray;
  border-radius: 0.5rem;
  text-align: center;
  margin: auto;
  width: 700px;
  padding: 2rem;
  flex-direction: column;
  display: flex;
  gap: 1rem;
  background-color: white;
}

.buttons {
  text-align: center;
  display: flex;
  gap: 1rem;
  margin-left: 4%;

  &.centered {
    justify-content: center;
  }
}

.button {
  cursor: pointer;

  color: white;
  background: #a886d9;
  text-decoration: none;

  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 10px;

  &:hover {
    background: #8b34f5;
  }
  &.disabled {
    cursor: default;
    background: lightgray;
    pointer-events: none;
  }
}

</style>