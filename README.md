# FitCore - Sistema Integrado de Gestão de Academia

Projeto acadêmico desenvolvido na disciplina **Projeto e Desenvolvimento de Software**, da Universidade Federal do Maranhão (UFMA).

O FitCore propõe uma solução para apoiar a gestão de uma academia, centralizando informações de clientes, matrículas, profissionais, treinos e exercícios.

> **Status atual:** o projeto está em desenvolvimento. O repositório contém a base da aplicação em Node.js e a modelagem inicial do banco de dados MySQL. Funcionalidades como controle financeiro, frequência e relatórios ainda devem ser implementadas e não fazem parte do núcleo já modelado no banco.

---

## Objetivo

Organizar processos básicos de uma academia que normalmente são controlados de forma dispersa ou manual, permitindo cadastrar clientes e profissionais, registrar matrículas e estruturar treinos personalizados.

---

## Escopo atual

A modelagem atual contempla os seguintes elementos do domínio:

- **Administrador**: usuário responsável por apoiar a administração do sistema.
- **Personal Trainer**: profissional que cria e acompanha treinos.
- **Cliente**: aluno vinculado à academia.
- **Matrícula**: vínculo do cliente com a academia.
- **Treino**: plano de treino associado a um cliente e a um personal trainer.
- **Item de Treino**: configuração de um exercício dentro de um treino, incluindo séries, repetições, peso, tempo, descanso e instruções.
- **Exercício**: atividade cadastrada no sistema.
- **Exercício de Musculação** e **Exercício Aeróbico**: especializações de exercício.
- **Aula**: atividade cadastrada com informações de tipo, horário, professor e vagas.

---

## Funcionalidades previstas

- Cadastro e gerenciamento de clientes;
- Cadastro de administradores e personal trainers;
- Registro e acompanhamento de matrículas;
- Cadastro de exercícios;
- Criação, edição e associação de treinos personalizados a clientes;
- Inclusão de itens, séries, repetições, carga, tempo, descanso e instruções nos treinos;
- Consulta das informações de treino de cada cliente.

### Funcionalidades futuras

As funcionalidades abaixo fazem parte da visão de evolução do FitCore, mas ainda não estão representadas na modelagem atual do banco de dados:

- Controle de pagamentos e inadimplência;
- Registro de frequência;
- Planos de academia;
- Relatórios gerenciais;
- Indicadores e análises de dados.

---

## Tecnologias

- **Node.js**
- **Express**
- **MySQL**
- **mysql2**
- **Bootstrap**

---

## Modelo de dados

O banco de dados utiliza o nome `academia` e possui, inicialmente, as tabelas:

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

- Um cliente possui uma matrícula;
- Um personal trainer pode criar vários treinos;
- Um cliente pode possuir vários treinos;
- Um treino é composto por vários itens de treino;
- Cada item de treino referencia um exercício;
- Um exercício pode possuir características específicas de musculação ou aeróbico.

## Pré-requisitos

Para configurar o ambiente de desenvolvimento, é necessário ter instalado:

- [Node.js](https://nodejs.org/);
- npm, instalado juntamente com o Node.js;
- MySQL Server;
- Uma ferramenta para administração do banco, como MySQL Workbench, phpMyAdmin ou terminal MySQL.

---

## Configuração do ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/liahcolins/Sistema-Integrado-de-Academia.git
cd Sistema-Integrado-de-Academia

```

### 2. Instale as dependências do projeto

Na pasta raiz do projeto, execute o comando abaixo:

```bash
npm install
 ```

## Documentação UML

Para apoiar a análise, o projeto e a implementação do FitCore, a documentação será composta pelos seguintes diagramas UML:

- **Diagrama de Casos de Uso:** apresentará os atores do sistema e as principais funcionalidades disponíveis para administradores, personal trainers e clientes;
- **Diagrama de Classes:** representará as entidades do domínio, seus atributos, operações e relacionamentos;
- **Diagrama de Sequência:** demonstrará a troca de mensagens entre os elementos do sistema durante operações importantes, como a criação e a atribuição de treinos;
- **Diagrama de Estados:** descreverá o ciclo de vida de entidades que possuem mudanças de situação, com foco principal na matrícula;
- **Diagrama de Atividades:** apresentará os fluxos de execução das funcionalidades principais, incluindo cadastro de clientes e elaboração de treinos.

---

## Próximas etapas

Para a evolução do FitCore, estão previstas as seguintes atividades:

1. Finalizar a estrutura principal da aplicação;
2. Definir o arquivo de entrada e configurar o comando `npm start`;
3. Organizar o projeto em rotas, controladores, serviços e acesso ao banco de dados;
4. Implementar o cadastro e gerenciamento de clientes, administradores e personal trainers;
5. Desenvolver o módulo de criação, edição e associação de treinos;
6. Elaborar os diagramas UML que compõem a documentação do sistema;
7. Separar as credenciais do banco de dados em variáveis de ambiente;
8. Implementar mecanismos de autenticação e armazenamento seguro de senhas;
9. Modelar e desenvolver, em etapas futuras, os módulos de pagamentos, frequência, planos e relatórios.

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

