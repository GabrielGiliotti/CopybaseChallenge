<script lang="ts">
    import type IMrrData from '@/interfaces/IMrrData';
    import type { PropType } from 'vue';
    import BarChart from './BarChart.vue';
    import LineChart from './LineChart.vue';

    export default {
      
      props: {
        mrrData: { type: Object as PropType<IMrrData> },
        showButton: { type: Boolean }
      },

      data() {
        return {
          showData: false,
          ingredientes: [] as string[]
        };
      },

      components: { BarChart, LineChart },
      
    }
</script>

<template>
    <main class="conteudo-principal">
      <KeepAlive include="SelecionarIngredientes">
        
        <section class="selecionar-ingredientes">
          <BarChart :mrrData="mrrData" :showData="showData" :showButton="showButton"/>
          <br>
          <LineChart />
        </section>

      </KeepAlive>
    </main>
</template>

<style scoped>

.selecionar-ingredientes {
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
