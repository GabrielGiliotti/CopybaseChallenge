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
        showButton: false
      }
    },
    
    methods:{
      populateMrr(event: any){
        this.mrrData = event.mrrData;
        this.churnData = event.churnData;
        this.showButton = true;
      }
    }
  }
</script>

<template>
  <Banner />
  <FileUploader @metrics="populateMrr($event)"/>
  <ConteudoPrincipal :mrrData="mrrData" :churnData="churnData" :showButton="showButton"/>
  <Rodape />
</template>

<style scoped>

</style>





