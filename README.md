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

# 🟢 **Status do Projeto: Concluído**

O projeto encontra-se **100% funcional e estável**, com todas as funcionalidades planejadas implementadas e testadas.  
A aplicação passou por uma série de melhorias estruturais e técnicas que garantem **qualidade, confiabilidade e manutenibilidade do código**.  

## ✅ **Principais Implementações**

- **Models** criados para representar as entidades principais (**Usuários**, **Tarefas**, **Categorias**, **Acessibilidade** e **Logs**).  
- **Migrations** para criação e manutenção das tabelas no banco de dados.  
- **Controllers** implementados para cada recurso, organizando as requisições de forma clara e padronizada.  
- **Services** para centralizar as regras de negócio e facilitar a manutenção do código.  
- **Validators** para garantir a integridade e consistência dos dados enviados à API.  
- **Rotas CRUD completas** para **Usuários**, **Tarefas**, **Categorias** e **Acessibilidade**, seguindo boas práticas REST.  
- **Autenticação de usuários** com suporte a **Login tradicional**, **Logout** e **Login com Google (OAuth)**.  
- **Middleware de autenticação** para proteger rotas privadas e gerenciar o acesso via **Bearer Token**.  
- **Auditoria completa (Logs)**, registrando todas as ações críticas do sistema — como criação, atualização, exclusão e login de usuários — com detalhamento por entidade, ação, usuário e data.  
- **Tratamento customizado de erros**, com mensagens amigáveis e padronizadas para o cliente.  
- **Testes unitários** implementados para garantir o funcionamento isolado das regras de negócio.  
- **Testes de integração** cobrindo as principais rotas da aplicação, validando o comportamento entre os módulos.  
- **Padrão de arquitetura MVC**, garantindo organização e escalabilidade.  
- **Suporte a acessibilidade**, incluindo opções de contraste, tamanho de fonte e recursos de leitura assistiva.  

---

## 🚀 **Situação Atual**

O sistema está **pronto para implantação** e preparado para futuras **melhorias e expansões**, mantendo uma base sólida para evolução contínua.  
A arquitetura modular, os testes automatizados e a auditoria completa garantem **segurança, estabilidade e escalabilidade** da aplicação.  

## 📜 Licença

Este projeto é de uso **acadêmico** para o Trabalho de Conclusão de Curso (TCC).

Licença exclusiva para fins educacionais.
