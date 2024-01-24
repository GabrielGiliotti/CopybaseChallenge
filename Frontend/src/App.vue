<script lang="ts">
  import Banner from './components/Banner.vue';
  import ConteudoPrincipal from './components/ConteudoPrincipal.vue';
  import Rodape from './components/Rodape.vue';
  import FileUploader from './components/FileUploader.vue';
  import type IMetricsData from '@/interfaces/IMetricsData';

  export default {

    components: { Banner, ConteudoPrincipal, Rodape, FileUploader },

    data() {
      return {
        mrrData: {} as IMetricsData,
        churnData: {} as IMetricsData,
        showButtons: false,
        showCharts: false
      }
    },
    
    methods:{
      populateMrr(event: any){
        this.showButtons = event;
      },

      showChart() {
        this.showCharts = true;
      }
    }
  }
</script>

<template>
  <Banner />
  <FileUploader @calculatedMetrics="populateMrr($event)" @show-charts="showChart"/>
  <ConteudoPrincipal :showButtons="showButtons"  :show-charts="showCharts"/>
  <Rodape />
</template>

<style scoped>

</style>





