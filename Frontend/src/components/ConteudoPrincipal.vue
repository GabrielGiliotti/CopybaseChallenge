<script lang="ts">
    import BarChart from '../charts/BarChart.vue';
    import LineChart from '../charts/LineChart.vue';

    export default {
      
      props: {
        showButtons: { type: Boolean },
        showCharts: { type: Boolean }
      },

      data() {
        return {
          ingredientes: [] as string[]
        };
      },

      components: { BarChart, LineChart }
    }
</script>

<template>
    <main class="conteudo-principal">
        
        <section class="charts-template">
          <BarChart :showButtons="showButtons" :showCharts="showCharts"/>
          <br>
          <div class="hr"></div>
          <br>
          <LineChart :showButtons="showButtons" :showCharts="showCharts"/>
        </section>

    </main>
</template>

<style scoped>
.hr {
  width: 100%;
  height: 1px;
  background-color: rgb(112, 63, 228);
}
.charts-template {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.conteudo-principal {
  padding: 6.5rem 7.5rem;
  border-radius: 3.75rem 3.75rem 0rem 0rem;
  background: var(--creme, #FFFAF3);
  color: var(--cinza, #444);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
}

@media only screen and (max-width: 1300px) {
  .conteudo-principal {
    padding: 5rem 3.75rem;
    gap: 3.5rem;
  }
}

@media only screen and (max-width: 767px) {
  .conteudo-principal {
    padding: 4rem 1.5rem;
    gap: 4rem;
  }
}
</style>
