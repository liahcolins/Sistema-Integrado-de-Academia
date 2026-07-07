document.addEventListener(
    'DOMContentLoaded',
    () => {

        carregarTreinos();
        carregarFiltros();

        // Colocar a data atual como padrão no campo de data de criação
        const hoje = new Date().toISOString().split('T')[0];
        document.getElementById('data_criacao').value = hoje;

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
                    <div class="action-buttons">
                        <button
                            class="delete-btn"
                            onclick="excluirTreino(${treino.id})"
                        >
                            Excluir
                        </button>
                    </div>
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

        const hoje = new Date().toISOString().split('T')[0];
        document.getElementById('data_criacao').value = hoje;

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

    const dataObj = new Date(data);
    const utcData = new Date(dataObj.getTime() + dataObj.getTimezoneOffset() * 60000);
    return utcData.toLocaleDateString('pt-BR');
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

async function carregarFiltros() {
    try {
        const [resClientes, resPersonais] = await Promise.all([
            fetch('/clientes'),
            fetch('/personal-trainers')
        ]);
        const clientes = await resClientes.json();
        const personais = await resPersonais.json();

        const selectCliente = document.getElementById('cliente_id');
        const selectPersonal = document.getElementById('personal_id');

        selectCliente.innerHTML = '<option value="">Selecione o Cliente</option>';
        clientes.forEach(c => {
            selectCliente.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
        });

        selectPersonal.innerHTML = '<option value="">Selecione o Personal</option>';
        personais.forEach(p => {
            selectPersonal.innerHTML += `<option value="${p.id}">${p.nome}</option>`;
        });
    } catch (err) {
        console.error('Erro ao carregar dados do modal:', err);
    }
}