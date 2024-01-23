<script lang="ts">
  import Banner from './components/Banner.vue';
  import ConteudoPrincipal from './components/ConteudoPrincipal.vue';
  import Rodape from './components/Rodape.vue';
  import FileUploader from './components/FileUploader.vue';
  import type IMrrData from './interfaces/IMrrData';

  export default {

    components: { Banner, ConteudoPrincipal, Rodape, FileUploader },

    data() {
      return {
        mrrData: {} as IMrrData,
        showButton: false
      }
    },
    
    methods:{
      populateMrr(event: IMrrData){
        this.mrrData = event;
        this.showButton = true;
      }
    }
  }
</script>

<template>
  <Banner />
  <FileUploader @metrica-m-r-r="populateMrr($event)"/>
  <ConteudoPrincipal :mrrData="mrrData" :showButton="showButton"/>
  <Rodape />
</template>

<style scoped>

</style>





