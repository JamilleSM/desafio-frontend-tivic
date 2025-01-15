# Configuração do Projeto Angular e JSON Server

Este guia descreve os passos necessários para configurar um projeto Angular no diretório `front` e um servidor JSON Server no diretório `back` para desenvolvimento local.

## Estrutura do Projeto

/
├── frontend/ # Diretório para o projeto Angular
├── backend/ # Diretório para o servidor JSON
└── README.md # Este arquivo

## Pré-requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas em seu ambiente:

- [Node.js](https://nodejs.org/) (Versão 14 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)

## Configurando o Projeto

### 1. Configuração do Projeto Angular (frontend)

#### Passo 1: Navegue até o diretório `frontend`

```bash
cd frontend
```

### Passo 2: Instale as dependências do Angular

#### Execute o comando abaixo para instalar as dependências do projeto Angular:

```bash
npm install
```

### Passo 3: Inicie o servidor de desenvolvimento do Angular

#### Execute o comando abaixo para iniciar o servidor de desenvolvimento:

```bash
ng serve
```

Isso irá iniciar o servidor na URL http://localhost:4200. Você poderá acessar o projeto Angular em seu navegador.

### 2. Configuração do JSON Server (backend)

OBS: CASO ESTEJA ACESSANDO O PROJETO VIA NETLIFY, É OBRIGATÓRIO RODAR O JSON-SERVER NA PORTA 3000.

#### Passo 1: Navegue até o diretório backend

```bash
cd backend
```

### Passo 2: Instale as dependências do JSON Server

#### Execute o seguinte comando para instalar o JSON Server:

```bash
npm install
```

### Passo 3: Inicie o JSON Server

#### Execute o seguinte comando para iniciar o servidor JSON:

```bash
npm start
```
