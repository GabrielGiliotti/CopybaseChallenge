<script lang="ts">
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { doRequest } from "../http/index";

  const url = 'http://localhost:3000/metricas/';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',

    components: { Bar },
    
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
            label: 'Monthly Recurring Revenue (MRR) - Ativos 2022 - em R$',
            data: [] as number[],
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
            label: 'Monthly Recurring Revenue (MRR) - Ativos 2022 - em R$',
            data: [] as number[],
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

        const resultMRR = await doRequest(url + "mrr", "GET", headers, queryValue, null);

        setTimeout(() => {
          this.chartData.labels = resultMRR.labels;
          this.chartData.datasets[0].data = resultMRR.data;
        }, 250);
      }
    }
  }
</script>

<template>
  <div class="borda-geral" :style="[!showButtons ? {'min-height':'100px'} : {'min-height': '600px'}]">
    <div class="buttons">
      <button class="button" :disabled='!showButtons' @click="updateChartData(3)" >
          MRR 3 Meses 
      </button>
      <button class="button" :disabled='!showButtons' @click="updateChartData(6)" >
          MRR 6 Meses 
      </button>
      <button class="button" :disabled='!showButtons' @click="updateChartData(9)" >
          MRR 9 Meses 
      </button>
      <button class="button" :disabled='!showButtons' @click="updateChartData(12)" >
          MRR 12 Meses 
      </button>
    </div>
    <br>
    <div class="wrapper" v-if="chartData.datasets[0].data.length">
      <Bar :options="chartOptions"
           :data="chartData"/>
      <div>
        * Cada assinante paga um valor diferente para seu serviço, logo MRR é a soma total do pagamento de cada assinante
      </div>
    </div>
    <div v-else-if="control">
      Grafico de <strong>Barras</strong>
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
  min-height: 800px;
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
  margin-left: 15%;
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