<script lang="ts">
  import Banner from './components/Banner.vue';
  import ConteudoPrincipal from './components/ConteudoPrincipal.vue';
  import Rodape from './components/Rodape.vue';
  import FileUploader from './components/isolated/FileUploader.vue';

  export default {
    components: { Banner, ConteudoPrincipal, Rodape, FileUploader }
  }
</script>

<template>
  <Banner />
  <FileUploader />
  <ConteudoPrincipal />
  <Rodape />
</template>

<style scoped>

</style>





