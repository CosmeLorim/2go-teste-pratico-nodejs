# README

Estes documento README tem como objetivo fornecer as informações necessárias execução deste projeto.

### Pré-requisitos ?

- NodeJS 10+;
- Yarn 1+;
- Opcionais caso queira usar docker-compose para gerenciar o banco de dados PostgreSQL:
  - Docker 19+;
  - Docker-compose 1.17+.

### Passo a passo para

- Clone o projeto
```bash
$ git clone git@github.com:CosmeLorim/2go-teste-pratico-nodejs.git
$ cd 2go-teste-pratico-nodejs
```

- Instalação das dependências do projeto
```bash
$ yarn
```

- Opcionalmente caso o banco de dados esteja sendo controlado via docker-compose, inicie via docker-compose
```bash
$ docker-compose up
```

- Crie um banco com o nome "2go"

- Inicie execute as migrates e seeds para popular o banco de dados
```bash
$ npm run db:migrate
$ npm run db:seed
```

- Para iniciar a aplicação em modo desenvolvimento
```bash
$ yarn start
```

- Para iniciar a aplicação em modo produção
```bash
$ yarn run prod
```
