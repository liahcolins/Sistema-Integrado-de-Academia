#  Documento de Requisitos - FitCore

##  Requisitos Funcionais

RF01 - O sistema deve permitir cadastrar alunos informando nome, CPF, telefone, e-mail e plano vinculado.

RF02 - O sistema deve permitir editar os dados cadastrais de alunos já registrados.

RF03 - O sistema deve permitir excluir alunos cadastrados.

RF04 - O sistema deve permitir cadastrar planos contendo nome, valor mensal e duração.

RF05 - O sistema deve permitir associar um aluno a exatamente um plano ativo por vez.

RF06 - O sistema deve permitir cadastrar treinos com nome, objetivo e lista de exercícios.

RF07 - O sistema deve permitir associar um ou mais treinos a um aluno.

RF08 - O sistema deve permitir registrar pagamentos contendo aluno, valor, data e status.

RF09 - O sistema deve identificar automaticamente alunos inadimplentes.

RF10 - O sistema deve permitir registrar a frequência dos alunos por data.

RF11 - O sistema deve permitir gerar relatório com a lista de alunos inadimplentes.

RF12 - O sistema deve permitir gerar relatório com a frequência individual de cada aluno.

RF13 - O sistema deve permitir exportar relatórios em formato CSV.


##  Requisitos Não Funcionais

RNF01 - O sistema deve ser desenvolvido na linguagem Python 3.12 ou superior.

RNF02 - O sistema deve executar as operações de cadastro, edição, exclusão e consulta em até 2 segundos, considerando uma base de até 1.000 alunos cadastrados.

RNF03 - O sistema deve manter tempo de resposta inferior a 2 segundos mesmo com até 1.000 alunos, 100 planos e 5.000 registros de pagamento cadastrados.

RNF04 - O sistema deve validar campos obrigatórios nos cadastros de alunos, planos, treinos e pagamentos, impedindo o salvamento de registros com dados incompletos.

RNF05 - O sistema não deve permitir o cadastro de dois alunos com o mesmo CPF.

RNF06 - O sistema deve armazenar os dados de forma persistente, garantindo que as informações permaneçam salvas mesmo após o encerramento da aplicação.

RNF07 - O sistema deve apresentar mensagens de erro claras sempre que houver tentativa de cadastro inválido, informando ao usuário o campo que precisa ser corrigido.

RNF08 - O sistema deve estar estruturado em, no mínimo, 3 módulos independentes: alunos, treinos e financeiro.

RNF09 - O sistema deve permitir a exportação de dados de alunos, pagamentos e frequência em formato CSV.

RNF10 - O sistema deve permitir que um usuário realize o cadastro de um aluno em até 1 minuto após iniciar a operação.

##  Regras de Negócio

RN01 - Um aluno não pode possuir mais de um plano ativo simultaneamente.

RN02 - Um aluno é considerado inadimplente quando possui pagamento em atraso superior a 30 dias.

RN03 - Um pagamento só pode ser registrado com valor maior que zero.

RN04 - Um aluno só pode ter frequência registrada se estiver com matrícula ativa.

RN05 - Um plano deve possuir valor mensal maior que zero.
