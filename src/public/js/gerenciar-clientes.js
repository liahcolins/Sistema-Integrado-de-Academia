let clienteEditando = null;
let personais = [];

document.addEventListener('DOMContentLoaded', () => {
    carregarClientes();
    carregarPersonais();

    document
        .getElementById('clienteForm')
        .addEventListener('submit', cadastrarCliente);
});

async function carregarPersonais() {
    try {
        const resposta = await fetch('/personal-trainers');
        personais = await resposta.json();
        
        const select = document.getElementById('personal_id');
        select.innerHTML = '<option value="">Sem Personal Trainer</option>';
        personais.forEach(p => {
            select.innerHTML += `<option value="${p.id}">${p.nome}</option>`;
        });
    } catch (err) {
        console.error('Erro ao carregar personais:', err);
    }
}

async function carregarClientes() {
    const resposta = await fetch('/clientes');
    const clientes = await resposta.json();

    const tabela = document.getElementById('clientesTable');
    tabela.innerHTML = '';

    clientes.forEach(cliente => {
        const personalNome = cliente.personal_nome || 'Nenhum';
        tabela.innerHTML += `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.status_matricula}</td>
                <td>${personalNome}</td>

                <td>
                    <div class="action-buttons">
                        <button
                            class="edit-btn"
                            onclick="abrirEditarCliente(
                                ${cliente.id},
                                '${cliente.nome}',
                                '${cliente.email}',
                                '${cliente.status_matricula}',
                                ${cliente.personal_id || 'null'}
                            )"
                        >
                            Editar
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deletarCliente(${cliente.id})"
                        >
                            Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

async function cadastrarCliente(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const status_matricula = document.getElementById('status_matricula').value;
    const personal_id = document.getElementById('personal_id').value || null;

    const dados = {
        nome,
        email,
        senha,
        status_matricula,
        personal_id
    };

    let resposta;

    if (clienteEditando !== null) {
        resposta = await fetch(`/clientes/${clienteEditando}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
    } else {
        resposta = await fetch('/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
    }

    if (resposta.ok) {
        clienteEditando = null;

        document.getElementById('clienteForm').reset();

        bootstrap.Modal
            .getInstance(document.getElementById('modalCliente'))
            .hide();

        carregarClientes();
    }
}

async function deletarCliente(id) {
    const confirmar = confirm('Deseja excluir este cliente?');
    if (!confirmar) return;

    await fetch(`/clientes/${id}`, {
        method: 'DELETE'
    });

    carregarClientes();
}

function abrirNovoCliente() {
    clienteEditando = null;

    document.getElementById('clienteForm').reset();
    document.getElementById('modalTitle').textContent = 'Cadastrar Cliente';

    const inputSenha = document.getElementById('senha');
    inputSenha.setAttribute('required', 'true');
    inputSenha.placeholder = 'Senha';

    const modal = new bootstrap.Modal(
        document.getElementById('modalCliente')
    );

    modal.show();
}

function abrirEditarCliente(id, nome, email, status, personalId) {
    clienteEditando = id;

    document.getElementById('nome').value = nome;
    document.getElementById('email').value = email;
    document.getElementById('status_matricula').value = status;
    document.getElementById('personal_id').value = personalId || '';
    document.getElementById('modalTitle').textContent = 'Editar Cliente';

    const inputSenha = document.getElementById('senha');
    inputSenha.value = '';
    inputSenha.removeAttribute('required');
    inputSenha.placeholder = 'Senha (deixe em branco para manter)';

    const modal = new bootstrap.Modal(
        document.getElementById('modalCliente')
    );

    modal.show();
}