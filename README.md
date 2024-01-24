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

Para executar o projeto no container: ```docker run --name nest-api -d -p 3000:3000 nestjs-api```

## Backend

Primeiro, acesse o diretório ```Backend``` via terminal ou prompt de comando e execute o comando de instalação das dependencias do projeto.

```npm i``` ou ```npm install```

Após a instalação das dependencias, execute o comando ```npm run start:dev``` e a API ficará disponível em ```http://localhost:3000```.

### Docker Backend

Para executar a API em um container docker, acesse o diretório ```Backend``` via terminal e execute os comandos a seguir.

Para build do projeto: ```docker build -t nestjs-api .```

Para executar o projeto no container: ```docker run --name nest-api -d -p 3000:3000 nestjs-api```