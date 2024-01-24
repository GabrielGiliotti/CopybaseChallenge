# Copybase Challenge

Desafio de exibição de métricas de negócio em gráficos.

Pré-requisitos: Ter o ambiente ```Node.js``` previamente instalado. 

Frameworks/bibliotecas principais:

```Vue.js    (Frontend)```
```Charts.js (Frontend)```
```Nest.js   (Backend)```

## Frontend

### Docker Frontend

## Backend

Para executar o projeto localmente, primeiro baixe ou clone o repositório em sua máquina local. Em seguida execute o comando de instalação das dependencias do projeto.

```npm i``` ou ```npm install```

Após a instalação das dependencias, execute o comando ```npm run start:dev``` e a API ficará disponível em ```http://localhost:3000```.

### Docker Backend

Para executar a API em um container docker, acesse o diretório ```Backend``` via terminal e execute os comandos a seguir.

Para build do projeto: ```docker build -t nestjs-app .```

Para executar o projeto: ```docker run --rm -p 3000:3000 nestjs-app```