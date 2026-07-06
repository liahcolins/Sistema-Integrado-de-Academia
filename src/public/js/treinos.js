document.addEventListener(
    'DOMContentLoaded',
    () => {

        carregarTreinos();

        document
            .getElementById('treinoForm')
            .addEventListener(
                'submit',
                cadastrarTreino
            );

    }
);

async function carregarTreinos() {

    const resposta = await fetch('/treinos');

    const treinos = await resposta.json();

    const tabela = document.getElementById('treinosTable');

    tabela.innerHTML = '';

    treinos.forEach(treino => {

        tabela.innerHTML += `
            <tr>
                <td>${treino.id}</td>
                <td>${treino.nome}</td>
                <td>${treino.cliente}</td>
                <td>${treino.personal}</td>
                <td>${formatarData(treino.data_criacao)}</td>
                <td>${treino.observacoes || ''}</td>
                <td>
    <button
        class="btn btn-danger btn-sm"
        onclick="excluirTreino(${treino.id})"
    >
        Excluir
    </button>
</td>
            </tr>
        `;

    });

}

async function cadastrarTreino(evento) {

    evento.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        data_criacao: document.getElementById('data_criacao').value,
        observacoes: document.getElementById('observacoes').value,
        cliente_id: document.getElementById('cliente_id').value,
        personal_id: document.getElementById('personal_id').value
    };

    const resposta = await fetch(
        '/treinos',
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(dados)
        }
    );

    if (resposta.ok) {

        document
            .getElementById('treinoForm')
            .reset();

        bootstrap.Modal
            .getInstance(
                document.getElementById('modalTreino')
            )
            .hide();

        carregarTreinos();

    } else {
        alert('Erro ao cadastrar treino');
    }

}

function formatarData(data) {

    if (!data) {
        return '';
    }

    return new Date(data).toLocaleDateString('pt-BR');
}

async function excluirTreino(id) {

    const confirmar = confirm(
        'Deseja realmente excluir este treino?'
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `/treinos/${id}`,
            {
                method: 'DELETE'
            }
        );

        if (!resposta.ok) {
            throw new Error('Erro ao excluir treino');
        }

        alert('Treino excluído com sucesso');

        carregarTreinos();

    } catch (erro) {

        console.error(
            'Erro ao excluir treino:',
            erro
        );

        alert('Não foi possível excluir o treino');
    }

}