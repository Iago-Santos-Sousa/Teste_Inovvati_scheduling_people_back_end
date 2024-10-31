# 📅 Sistema de Agendamentos

API REST para sistema de agendamentos desenvolvida com Node.js, Express e MySQL.

## 🚀 Pré-requisitos

- Node.js (versão 18 ou superior)
- MySQL (versão 8.0 ou superior)
- npm (última versão estável)
- Docker e Docker Compose (opcional)

## 🔧 Instalação e Configuração

### Clonando o Repositório

```bash
git clone git@github.com:Iago-Santos-Sousa/Teste_Inovvati_scheduling_people_back_end.git
cd seu-projeto
```

### Instalando Dependências

```bash
npm install
```

### Configuração do Banco de Dados

#### Opção 1: MySQL Local

1. Acesse o MySQL e execute os seguintes comandos:

```sql
CREATE DATABASE scheduling;
USE scheduling;

CREATE TABLE scheduling.`users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registration_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE scheduling.`appointments` (
  `scheduling_id` int NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `person_name` varchar(250) NOT NULL,
  `scheduling_date` varchar(250) NOT NULL,
  `location` varchar(255) NOT NULL,
  `registration_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`scheduling_id`),
  FOREIGN KEY (`user_id`) REFERENCES scheduling.`users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

#### Opção 2: Usando Docker

1. Crie um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
version: "3.8"
services:
  mysql:
    image: mysql:8.0
    container_name: scheduling_mysql
    environment:
      MYSQL_ROOT_PASSWORD: sua_senha_root
      MYSQL_DATABASE: scheduling
      MYSQL_USER: seu_usuario
      MYSQL_PASSWORD: sua_senha
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  node_app:
    build: .
    container_name: scheduling_api
    depends_on:
      - mysql
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=mysql
      - DB_USER=seu_usuario
      - DB_PASSWORD=sua_senha
      - DB_NAME=scheduling
      - JWT_SECRET=seu_jwt_secret

volumes:
  mysql_data:
```

2. Crie um arquivo `Dockerfile`:

```dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

3. Execute o Docker Compose:

```bash
docker-compose up -d
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
APP_PORT=porta_da_aplicacao
DB_HOST=localhost
DB_USER=usuario_do_banco
DB_PORT=3306
DB_PASS=senha_do_seu_banco
DB_SCHEMA=batabase_usado
DB_CONN_LIMIT=10
JWT_SECRET=chave_para_o_jwt
JWT_EXPIRES=30m
```

## 📂 Estrutura do Projeto

```
scheduling-api/
│
├── src/
│   ├── db/               # Configuração e conexão com banco de dados
│   ├── middlewares/      # Middlewares de autenticação e validação
│   ├── models/          # Modelos de dados
│   ├── routes/          # Rotas da API
│   ├── services/        # Lógica de negócios
│   ├── utils/           # Funções utilitárias
│   └── server.js        # Configuração do servidor Express
│
├── index.js             # Ponto de entrada da aplicação
├── .env                 # Variáveis de ambiente
├── .gitignore
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## 🚀 Executando o Projeto

### Desenvolvimento Local

```bash
# Iniciar o servidor em modo desenvolvimento
npm run dev ou node index.js
```

## 🔑 Autenticação

O projeto utiliza JSON Web Token (JWT) para autenticação e Bcrypt para hash de senhas.

## 📝 Endpoints da API

```
POST /api/users/signup - Registro de novo usuário
POST /api/sign - Login de usuário
POST /api/schedule/create/appointments - Cria um novo agendamento
GET /api/schedule/list/appointments - Lista os agendamentos
GET /api/schedule/get/appointments - Retorna um agendamento
PUT /api/schedule/update/appointments - Atualiza um agendamento
DELETE /api/delete/delete/appointments - Exclui um agendamento
```

## 🔍 Dicas para Desenvolvimento

### Usando Docker

1. Para iniciar apenas o banco de dados:

```bash
docker-compose up mysql -d
```

2. Para reconstruir a aplicação após mudanças:

```bash
docker-compose up --build -d
```

3. Para visualizar logs:

```bash
docker-compose logs -f
```

### Usando Node.js Local com Docker MySQL

1. Inicie apenas o container MySQL:

```bash
docker-compose up mysql -d
```

2. Execute o Node.js localmente:

```bash
npm run dev
```

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📞 Contato

E-mail - [iago.santos.sousa@gmail.com](iago.santos.sousa@gmail.com)

Link do Projeto: [git@github.com:Iago-Santos-Sousa/Teste_Inovvati_scheduling_people_back_end.git](git@github.com:Iago-Santos-Sousa/Teste_Inovvati_scheduling_people_back_end.git)
