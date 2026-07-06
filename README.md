# FitCore - Sistema Integrado de Gestão de Academia

Projeto acadêmico desenvolvido na disciplina **Projeto e Desenvolvimento de Software**, da **Universidade Federal do Maranhão (UFMA)**.

O FitCore é uma aplicação web para apoiar a gestão de uma academia, centralizando cadastros de clientes, personal trainers, exercícios, matrículas e treinos personalizados.

> **Status:** em desenvolvimento. O projeto já possui uma aplicação Node.js/Express integrada ao MySQL, rotas REST, modelos de dados e telas administrativas para os principais cadastros. Alguns módulos e melhorias de segurança ainda estão em evolução.

---

## Objetivo

Organizar processos básicos de uma academia que normalmente são controlados de forma dispersa ou manual, permitindo cadastrar pessoas, registrar matrículas, estruturar treinos e associar exercícios a cada treino.

---

## Funcionalidades implementadas

### Back-end

- CRUD de **clientes**;
- CRUD de **personal trainers**;
- CRUD de **exercícios**;
- CRUD de **matrículas**;
- CRUD de **treinos**;
- CRUD de **itens de treino**;
- Endpoint inicial de login para administrador, personal trainer e cliente;
- Integração com banco de dados MySQL.

### Interface administrativa

- Cadastro, edição e exclusão de clientes;
- Cadastro, edição e exclusão de personal trainers;
- Cadastro, edição e exclusão de exercícios;
- Cadastro, listagem e exclusão de treinos;
- Confirmação antes de excluir um treino;
- Atualização automática da tabela de treinos após a exclusão.

> A atualização de treinos já está disponível na API, mas ainda precisa ser integrada à interface web.

---

## Funcionalidades em evolução

- Tela administrativa para matrículas;
- Interface para montar treinos com itens, exercícios, séries, repetições, carga, tempo, descanso e instruções;
- Edição de treinos pela interface;
- Dashboard com dados reais do banco;
- Controle de permissões por perfil;
- Autenticação com sessão ou token;
- Criptografia de senhas;
- Controle financeiro, pagamentos, frequência, planos, relatórios e indicadores.

---

## Tecnologias

- **Node.js**
- **Express**
- **MySQL**
- **mysql2**
- **Bootstrap**
- **JavaScript, HTML e CSS**

---

## Estrutura do projeto

```text
Sistema-Integrado-de-Academia/
├── database/
│   └── academia.sql                # Script de criação do banco e tabelas
├── docs/                           # Espaço destinado à documentação do projeto e diagramas UML
├── src/
│   ├── config/                     # Configuração da conexão com o banco
│   ├── controllers/                # Regras de entrada e resposta da API
│   ├── models/                     # Consultas e operações com o MySQL
│   ├── public/                     # Arquivos estáticos: CSS, JavaScript e imagens
│   ├── routes/                     # Definição dos endpoints da aplicação
│   ├── views/                      # Páginas HTML da aplicação
│   └── app.js                      # Arquivo de entrada do servidor
├── package.json
└── README.md
```

A arquitetura segue, de forma simplificada, o fluxo:

```text
Interface / Cliente HTTP
        ↓
Routes
        ↓
Controllers
        ↓
Models
        ↓
MySQL
```

---

## Modelo de dados

O banco utiliza o nome `academia` e possui as tabelas:

```text
administrador
personal_trainer
cliente
matricula
treino
item_treino
exercicio
exercicio_musculacao
exercicio_aerobico
aula
```

### Relações principais

- Um cliente possui, no modelo atual, uma matrícula associada;
- Um cliente pode possuir vários treinos;
- Um personal trainer pode criar vários treinos;
- Um treino possui vários itens de treino;
- Cada item de treino referencia um exercício;
- Um exercício pode possuir uma especialização de musculação, aeróbico ou aula.

---

## Endpoints principais

| Recurso | Operações disponíveis |
|---|---|
| Clientes | `GET`, `POST`, `PUT /:id`, `DELETE /:id` em `/clientes` |
| Personais | `GET`, `POST`, `PUT /:id`, `DELETE /:id` em `/personal-trainers` |
| Exercícios | `GET`, `POST`, `PUT /:id`, `DELETE /:id` em `/exercicios` |
| Matrículas | `GET`, `POST`, `PUT /:id`, `DELETE /:id` em `/matriculas` |
| Treinos | `GET`, `POST`, `PUT /:id`, `DELETE /:id` em `/treinos` |
| Itens de treino | `GET /treino/:treinoId`, `POST`, `PUT /:id`, `DELETE /:id` em `/itens-treino` |
| Login | `POST /api/login` |

---

## Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/);
- npm, instalado juntamente com o Node.js;
- MySQL Server;
- MySQL Workbench, phpMyAdmin ou outra ferramenta de administração do banco.

---

## Como executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/liahcolins/Sistema-Integrado-de-Academia.git
cd Sistema-Integrado-de-Academia
```

### 2. Instale as dependências

```bash
npm ci
```

> `npm install` também pode ser utilizado, mas `npm ci` instala as versões definidas no `package-lock.json`.

### 3. Crie o banco de dados

Importe o arquivo abaixo no MySQL Workbench ou execute-o pelo terminal MySQL:

```text
database/academia.sql
```

No MySQL Workbench, use **File → Open SQL Script**, selecione o arquivo e execute o script pelo botão de raio.

### 4. Configure sua conexão local

Abra o arquivo:

```text
src/config/database.js
```

E informe as credenciais do seu MySQL local. Exemplo:

```js
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'SEU_USUARIO_MYSQL',
    password: 'SUA_SENHA_MYSQL',
    database: 'academia'
});
```

> Não envie senhas reais ao GitHub. Alterações locais de credenciais não devem ser commitadas.

### 5. Inicie o servidor

```bash
node src/app.js
```

Com a conexão configurada corretamente, o terminal deve exibir mensagens semelhantes a:

```text
Servidor rodando na porta 3000
Conectado ao banco academia com sucesso
```

### 6. Acesse a aplicação

Com o servidor em execução, abra no navegador:

```text
http://localhost:3000
```

Páginas administrativas disponíveis:

```text
http://localhost:3000/admin/dashboard
http://localhost:3000/admin/gerenciar-clientes
http://localhost:3000/admin/gerenciar-personais
http://localhost:3000/admin/gerenciar-exercicios
http://localhost:3000/admin/treinos
```

---

## Teste do fluxo de treinos

Um fluxo de validação já utilizado localmente é:

```text
Cadastrar personal de teste
        ↓
Cadastrar cliente de teste
        ↓
Cadastrar treino vinculado aos IDs criados
        ↓
Clicar em Excluir
        ↓
Confirmar a exclusão
        ↓
Treino removido do MySQL e da tabela exibida na página
```

---

## Documentação UML

A documentação UML do FitCore abrange os seguintes artefatos:

- **Diagrama de Casos de Uso:** atores e funcionalidades disponíveis para administrador, personal trainer e cliente;
- **Diagrama de Classes:** entidades do domínio, atributos, operações e relacionamentos;
- **Diagrama de Sequência:** troca de mensagens em operações relevantes, como cadastro e exclusão de treino;
- **Diagrama de Estados:** ciclo de vida da matrícula;
- **Diagrama de Atividades:** fluxos como cadastro de cliente e elaboração de treino.

Os arquivos de diagramas devem ser mantidos na pasta `docs/` e, quando adicionados ao repositório, podem ser referenciados diretamente nesta seção.

---

## Limitações técnicas conhecidas

O projeto está em evolução e possui pontos técnicos planejados para melhoria:

1. As credenciais do banco ainda devem ser migradas para variáveis de ambiente;
2. As senhas precisam ser armazenadas com hash, e não em texto puro;
3. O login ainda precisa criar sessão ou token e proteger rotas por perfil;
4. É necessário validar campos e verificar quando uma atualização ou exclusão não encontra o registro solicitado;
5. Devem ser criados testes automatizados e um script `npm start` no `package.json`.

---

## Integrantes

- Ana Patricia Garros Viegas;
- Guilherme Haniel Costa Passinho;
- Guilherme Pessôa Lima Diniz;
- Liah Renata Colins da Silva.

---

## Informações acadêmicas

- **Disciplina:** Projeto e Desenvolvimento de Software;
- **Instituição:** Universidade Federal do Maranhão - UFMA;
- **Professor:** Davi Viana dos Santos.
