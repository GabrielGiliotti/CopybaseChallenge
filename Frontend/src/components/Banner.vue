<template>
    <header class="banner">
    <div class="apresentacao">
      <img src="../assets/images/logo.svg" alt="Logo My App" class="logo">
      <p class="cabecalho-lg frase-cabecalho">
        <span class="texto-lilas">Página para exibição</span>
          de métricas em gráficos!
      </p>

      <p class="subtitulo-lg">
        Template para desafio: front-end com Vue.js 
      </p>
    </div>

  </header>
</template>

<style scoped>
.banner {
  padding: 4rem 7.5rem;
  color: var(--creme);

  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 3.25rem;
}

.apresentacao {
  text-align: center;
}
.logo {
  height: 4.5rem;
  margin-bottom: 3rem;
}

.frase-cabecalho {
  margin-bottom: 2rem;
}

.texto-lilas {
  color: var(--lilas, #a886d9);
}

.foto-banner {
  width: 35rem;
}

@media only screen and (max-width: 1300px) {
  .banner {
    padding: 4rem 3.75rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

@media only screen and (max-width: 767px) {
  .banner {
    padding: 4rem 1.5rem;
  }

  .foto-banner {
    width: min(100%, 21.25rem);
  }
}
</style>