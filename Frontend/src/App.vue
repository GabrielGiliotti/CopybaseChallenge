<script lang="ts">
  import type { PropType } from 'vue';
  import Banner from './components/Banner.vue';
  import ConteudoPrincipal from './components/ConteudoPrincipal.vue';
  import Rodape from './components/Rodape.vue';
  import FileUploader from './components/isolated/FileUploader.vue';
  import type IMrrData from './interfaces/IMrrData';

  export default {

    components: { Banner, ConteudoPrincipal, Rodape, FileUploader },

    data() {
      return {
        mrrData: {} as IMrrData
      }
    },
    
    methods:{
      populateMrr(event: IMrrData){
        this.mrrData = event;
      }
    }
  }
</script>

<template>
  <Banner />
  <FileUploader @metrica-m-r-r="populateMrr($event)"/>
  <ConteudoPrincipal :mrr-data="mrrData"/>
  <Rodape />
</template>

<style scoped>

</style>





