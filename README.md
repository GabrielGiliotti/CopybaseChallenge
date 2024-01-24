# Copybase Challenge

Desafio de exibição de métricas de negócio em gráficos.  
Pré-requisitos: Ter o ambiente ```Node.js``` previamente instalado.  

Frameworks/bibliotecas principais:

```Vue.js e Charts.js (Frontend)```    
```Nest.js (Backend)```  

Todos os comandos a seguir pressupõem que o repositório ja foi clonado ou baixado como ZIP para a máquina local. (Caso necessário, procure por ```git clone como fazer``` na web).

## Frontend

Primeiro, acesse o diretório ```Frontend``` via terminal ou prompt de comando e execute o comando de instalação das dependencias do projeto.

```npm i``` ou ```npm install```

Após a instalação das dependencias, execute o comando ```npm run dev``` e a API ficará disponível em ```http://localhost:5173```.

### Docker Frontend

Para executar o App em um container docker, acesse o diretório ```Frontend``` via terminal e execute os comandos a seguir.

Para build do projeto: ```docker build -t vuejs-app .```

Para executar o projeto no container: ```docker run --name vue-app -d -p 8080:8080 vuejs-app```

Após execução dos comandos, abra seu navegador e digite no campo de url o endereço ```http://localhost:8080```

## Backend

Primeiro, acesse o diretório ```Backend``` via terminal ou prompt de comando e execute o comando de instalação das dependencias do projeto.

```npm i``` ou ```npm install```

Após a instalação das dependencias, execute o comando ```npm run start:dev``` e a API ficará disponível em ```http://localhost:3000```.

### Docker Backend

Para executar a API em um container docker, acesse o diretório ```Backend``` via terminal e execute os comandos a seguir.

Para build do projeto: ```docker build -t nestjs-api .```

Para executar o projeto no container: ```docker run --name nest-api -d -p 3000:3000 nestjs-api```

## Pontos para melhorias

### Frontend

* Não é possível limpar o component de upload e selecionar o último arquivo previamente selecionado
* Após limpar um primeiro arquivo e ralizar o upload de um segundo, é necessário trocar de abas clicando em um dos botões dos charts para que os dados sejam atualizados
* Tornar components responsivos para se adaptarem a qualquer dispositivo
* 

### Backend

* Acrescentar um banco de dados para armazenar dados calculados
* Separar Classes que estão em um mesmo arquivo model
* Revisar construção dos jsons retornados nos endpoints
* Acresecentar outras métricas