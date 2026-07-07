#  Documento de Requisitos - FitCore

##  Requisitos Funcionais

RF01 - O sistema deve permitir cadastrar clientes informando nome, e-mail, senha e status de matrícula.

RF02 - O sistema deve permitir listar os clientes cadastrados.

RF03 - O sistema deve permitir editar os dados cadastrais de clientes já registrados.

RF04 - O sistema deve permitir excluir clientes cadastrados.

RF05 - O sistema deve permitir cadastrar personal trainers informando nome, e-mail, senha e CREF.

RF06 - O sistema deve permitir listar, editar e excluir personal trainers cadastrados.

RF07 - O sistema deve permitir cadastrar exercícios informando nome, descrição e categoria.

RF08 - O sistema deve permitir listar, editar e excluir exercícios cadastrados.

RF09 - O sistema deve permitir cadastrar matrículas informando data de início, status e cliente associado.

RF10 - O sistema deve permitir listar, editar e excluir matrículas cadastradas.

RF11 - O sistema deve permitir cadastrar treinos informando nome, data de criação, observações, cliente e personal trainer responsável.

RF12 - O sistema deve permitir associar um ou mais treinos a um cliente.

RF13 - O sistema deve permitir atualizar os dados de um treino já cadastrado.

RF14 - O sistema deve permitir excluir treinos cadastrados mediante confirmação do usuário.

RF15 - O sistema deve permitir cadastrar itens de treino associados a um treino e a um exercício.

RF16 - O sistema deve permitir registrar, em um item de treino, séries, repetições, peso, tempo, descanso e instruções.

RF17 - O sistema deve permitir consultar os itens vinculados a um treino específico.

RF18 - O sistema deve permitir que administrador, personal trainer ou cliente realizem login utilizando e-mail e senha.


##  Requisitos Não Funcionais

RNF01 - O sistema deve ser desenvolvido utilizando Node.js, Express, JavaScript, HTML, CSS, Bootstrap e MySQL.

RNF02 - O sistema deve executar operações de cadastro, edição, exclusão e consulta em até 2 segundos em condições normais de uso, considerando uma base de até 1.000 clientes cadastrados.

RNF03 - O sistema deve utilizar banco de dados persistente, garantindo que os dados permaneçam armazenados após o encerramento da aplicação.

RNF04 - O sistema deve apresentar mensagens claras quando ocorrerem erros durante operações de cadastro, edição, exclusão ou consulta.

RNF05 - O sistema deve possuir estrutura separada em rotas, controllers, models, views e arquivos estáticos.

RNF06 - O sistema deve ser acessível por navegador web em ambiente local.

RNF07 - As credenciais de acesso ao banco de dados não devem ser enviadas ao repositório público.

RNF08 - O sistema deve manter a interface administrativa organizada, permitindo acesso aos módulos de clientes, personais, exercícios, treinos e matrículas.

##  Regras de Negócio

RN01 - Um cliente pode possuir vários treinos associados.

RN02 - Todo treino deve estar associado obrigatoriamente a um cliente e a um personal trainer.

RN03 - Todo item de treino deve estar associado obrigatoriamente a um treino e a um exercício.

RN04 - Um exercício pode possuir características específicas de musculação, exercício aeróbico ou aula.

RN05 - Uma matrícula deve estar associada obrigatoriamente a um cliente.

RN06 - A exclusão de um treino deve solicitar confirmação antes de enviar a operação ao banco de dados.

RN07 - A exclusão de um cliente, personal trainer, treino ou exercício pode afetar registros associados conforme as regras de integridade do banco de dados.
