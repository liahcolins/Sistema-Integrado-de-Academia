let matriculaEditando = null;
let todasMatriculas = [];
let todosClientes = [];
let filtroAtual = 'Todas';

document.addEventListener('DOMContentLoaded', () => {
    carregarDados();

    document
        .getElementById('matriculaForm')
        .addEventListener('submit', salvarMatricula);
});

async function carregarDados() {
    try {
        // Buscar todos os clientes e todas as matrículas
        const [resClientes, resMatriculas] = await Promise.all([
            fetch('/clientes'),
            fetch('/matriculas')
        ]);

        todosClientes = await resClientes.json();
        todasMatriculas = await resMatriculas.json();

        renderizarTabela();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar dados do servidor.');
    }
}

function renderizarTabela() {
    const tabela = document.getElementById('matriculasTable');
    tabela.innerHTML = '';

    // Filtrar conforme status selecionado
    const matriculasFiltradas = todasMatriculas.filter(m => {
        if (filtroAtual === 'Todas') return true;
        return m.status === filtroAtual;
    });

    if (matriculasFiltradas.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center;">Nenhuma matrícula encontrada.</td>
            </tr>
        `;
        return;
    }

    matriculasFiltradas.forEach(m => {
        // Formatar data de YYYY-MM-DD para DD/MM/YYYY
        let dataFormatada = 'N/A';
        if (m.data_inicio) {
            const dataObj = new Date(m.data_inicio);
            // Ajustar fuso horário local
            const utcData = new Date(dataObj.getTime() + dataObj.getTimezoneOffset() * 60000);
            dataFormatada = utcData.toLocaleDateString('pt-BR');
        }

        const badgeClass = m.status === 'Ativa' ? 'ativa' : 'inativa';

        tabela.innerHTML += `
            <tr>
                <td>${m.id}</td>
                <td>${m.cliente}</td>
                <td>${dataFormatada}</td>
                <td>
                    <span class="status-badge-mat ${badgeClass}">${m.status}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button
                            class="edit-btn"
                            onclick="abrirEditarMatricula(
                                ${m.id},
                                ${m.cliente_id},
                                '${m.data_inicio}',
                                '${m.status}'
                            )"
                        >
                            Editar
                        </button>
                        <button
                            class="delete-btn"
                            onclick="deletarMatricula(${m.id}, ${m.cliente_id})"
                        >
                            Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

function filtrarMatriculas(status) {
    filtroAtual = status;
    
    // Atualiza botões ativos na UI
    const botoes = document.querySelectorAll('.filter-btn');
    botoes.forEach(btn => {
        if (btn.innerText.includes(status) || (status === 'Todas' && btn.innerText === 'Todas')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderizarTabela();
}

function abrirNovoCadastro() {
    matriculaEditando = null;
    document.getElementById('matriculaForm').reset();
    document.getElementById('modalMatriculaTitle').innerText = 'Cadastrar Matrícula';
    
    const selectCliente = document.getElementById('cliente_id');
    selectCliente.disabled = false;
    selectCliente.innerHTML = '<option value="">Selecione o Cliente</option>';

    // Mostrar apenas clientes que não possuem matrícula cadastrada
    const idsComMatricula = todasMatriculas.map(m => m.cliente_id);
    const clientesSemMatricula = todosClientes.filter(c => !idsComMatricula.includes(c.id));

    if (clientesSemMatricula.length === 0) {
        selectCliente.innerHTML += '<option value="" disabled>Todos os clientes já possuem matrícula</option>';
    } else {
        clientesSemMatricula.forEach(c => {
            selectCliente.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
        });
    }
}

function abrirEditarMatricula(id, clienteId, dataInicio, status) {
    matriculaEditando = id;
    document.getElementById('modalMatriculaTitle').innerText = 'Editar Matrícula';
    
    // Formatar data para YYYY-MM-DD
    let dataFormatada = '';
    if (dataInicio) {
        dataFormatada = dataInicio.split('T')[0];
    }
    document.getElementById('data_inicio').value = dataFormatada;
    document.getElementById('status').value = status;

    const selectCliente = document.getElementById('cliente_id');
    selectCliente.disabled = true; // Não permitir alterar o cliente associado

    // Localizar o cliente correspondente para garantir que apareça selecionado
    const cliente = todosClientes.find(c => c.id === clienteId);
    selectCliente.innerHTML = `<option value="${clienteId}" selected>${cliente ? cliente.nome : 'Cliente #' + clienteId}</option>`;

    const modal = new bootstrap.Modal(document.getElementById('modalMatricula'));
    modal.show();
}

async function salvarMatricula(evento) {
    evento.preventDefault();

    const cliente_id = document.getElementById('cliente_id').value;
    const data_inicio = document.getElementById('data_inicio').value;
    const status = document.getElementById('status').value;

    const dados = {
        cliente_id: parseInt(cliente_id),
        data_inicio,
        status
    };

    try {
        let resposta;
        if (matriculaEditando !== null) {
            resposta = await fetch(`/matriculas/${matriculaEditando}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        } else {
            resposta = await fetch('/matriculas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        }

        if (resposta.ok) {
            // Sincronizar o status da matrícula no cadastro do Cliente
            const cliente = todosClientes.find(c => c.id === parseInt(cliente_id));
            if (cliente) {
                await fetch(`/clientes/${cliente.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: cliente.nome,
                        email: cliente.email,
                        status_matricula: status
                    })
                });
            }

            bootstrap.Modal.getInstance(document.getElementById('modalMatricula')).hide();
            await carregarDados();
        } else {
            alert('Erro ao salvar matrícula.');
        }
    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert('Erro ao conectar ao servidor.');
    }
}

async function deletarMatricula(id, clienteId) {
    const confirmar = confirm('Deseja excluir esta matrícula? O status do cliente passará para Inativo.');
    if (!confirmar) return;

    try {
        const resposta = await fetch(`/matriculas/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            // Atualizar o status da matrícula no cadastro do Cliente para Inativo
            const cliente = todosClientes.find(c => c.id === clienteId);
            if (cliente) {
                await fetch(`/clientes/${clienteId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: cliente.nome,
                        email: cliente.email,
                        status_matricula: 'Inativa'
                    })
                });
            }

            await carregarDados();
        } else {
            alert('Erro ao excluir matrícula.');
        }
    } catch (error) {
        console.error('Erro ao excluir:', error);
        alert('Erro ao conectar ao servidor.');
    }
}
