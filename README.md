# 📌 PrismaTask - Backend

O **PrismaTask** é um sistema de gerenciamento de tarefas com foco em **acessibilidade**.  
Este repositório contém o **backend da aplicação**, desenvolvido como parte do nosso **TCC** em Ciência da Computação.  

---

## 📖 Resumo
O PrismaTask busca oferecer uma plataforma de gerenciamento de tarefas robusta, moderna e inclusiva, garantindo que usuários com diferentes necessidades possam utilizá-lo de forma eficiente.  

---

## ⚙️ Funcionalidades

### 🔑 Autenticação
- Login
- Logout
- Criação de usuário
- Exclusão de usuário
- Alteração de dados
- Recuperação de senha

### ✅ Tarefas
- Criação
- Exclusão (com lixeira e restauração em até 30 dias)
- Atualização
- Definição de prazo
- Definição de prioridade (Alta, Média, Baixa)
- Definição de categoria
- Mudança de status (Ex: Pendente, Em Progresso, Concluída, etc.)
- Consulta por diversos campos (usuário, status, categoria, etc.)

### ♿ Acessibilidade
- Ajuste do tamanho da fonte
- Alteração do tipo de fonte
- Modo contraste
- Máscara de leitura
- Guia de leitura
- Lupa de conteúdo
- Aumento do cursor
- Comandos de voz
- Suporte a Libras

---

## 🛠️ Tecnologias Utilizadas
- **Node.js** — Ambiente de execução
- **AdonisJS** — Framework backend
- **Lucid ORM** — Gerenciamento do banco de dados
- **TypeScript** — Tipagem estática
- **SQLite** — Banco de dados leve e eficiente

---

## 🚀 Como Executar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/Allefgit/prismatask-api.git
   
2. Instale as dependências:
   ```bash
   npm install

3. Configure as variáveis de ambiente
   ```bash
   cp .env.example .env

4. Rode as migrations:
   ```bash
   node ace migration:run

5. Inicie o servidor:
   ```bash
   npm run dev

## 📌 Status do Projeto

### ✅ Concluído até o momento:
- **Models** criados para representar as entidades principais
- **Migrations** para criação e manutenção das tabelas no banco de dados
- **Controllers** implementados para cada recurso
- **Services** para centralizar as regras de negócio
- **Validators** para garantir a integridade dos dados
- **Rotas** de CRUD de **Usuários**, **Tarefas**, **Categorias** e **Acessibilidade**
- **Autenticação de usuários** (Login, Logout, Google Auth)
- **Middleware de autenticação** para proteger rotas privadas

### 🚧 Futuras implementações:
- Sistema centralizado de **tratamento de erros**
- **Testes automatizados**
- Implementação de **LOGs** para auditoria de ações
- Deploy em ambiente cloud 

## 📜 Licença

Este projeto é de uso **acadêmico** para o Trabalho de Conclusão de Curso (TCC).

Licença exclusiva para fins educacionais.
