<script lang="ts">
  import type IMetricsData from '@/interfaces/IMetricsData';
  import type { PropType } from 'vue';

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
      churnData: { type: Object as PropType<IMetricsData> },
      showData: { type: Boolean },
      showButton: { type: Boolean }
    },

    data() {
      return {
        chartData: {
          labels: [] as string[],
          datasets: [{
            axis: 'y',
            label: 'Monthly Churn Rate (%)',
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
     
    methods: {
      updateChartData() {
        this.chartData.labels = this.churnData?.labels as string[];
        this.chartData.datasets[0].data = this.churnData?.data as number[];
      }
    }
  }
</script>

<template>
  <div class="buttons" @click="updateChartData()" v-if="showButton">
    <label class="button">
      Churn Rate
    </label>
  </div>
  <br>
  <div class="wrapper" v-if="chartData.datasets[0].data.length">
    <Line :options="chartOptions"
          :data="chartData"/>
  </div>
</template>

<style scoped>

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
  border-radius: 2px;

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