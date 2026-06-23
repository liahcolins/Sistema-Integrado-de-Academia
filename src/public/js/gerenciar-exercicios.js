let exercicioEditando = null;

document.addEventListener('DOMContentLoaded', () => {
    carregarExercicios();

    document
        .getElementById('exercicioForm')
        .addEventListener('submit', cadastrarExercicio);
});

async function carregarExercicios() {
    const resposta = await fetch('/exercicios');
    const exercicios = await resposta.json();

    const tabela =
        document.getElementById('exerciciosTable');

    tabela.innerHTML = '';

    exercicios.forEach(exercicio => {
        tabela.innerHTML += `
            <tr>
                <td>${exercicio.id}</td>
                <td>${exercicio.nome}</td>
                <td>${exercicio.descricao}</td>
                <td>${exercicio.categoria}</td>

                <td>
                    <div class="action-buttons">
                        <button
                            class="edit-btn"
                            onclick="abrirEditarExercicio(
                                ${exercicio.id},
                                '${exercicio.nome}',
                                '${exercicio.descricao}',
                                '${exercicio.categoria}'
                            )"
                        >
                            Editar
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deletarExercicio(${exercicio.id})"
                        >
                            Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

async function cadastrarExercicio(evento) {
    evento.preventDefault();

    const nome =
        document.getElementById('nome').value;

    const descricao =
        document.getElementById('descricao').value;

    const categoria =
        document.getElementById('categoria').value;

    const dados = {
        nome,
        descricao,
        categoria
    };

    let resposta;

    if (exercicioEditando !== null) {
        resposta = await fetch(
            `/exercicios/${exercicioEditando}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            }
        );
    } else {
        resposta = await fetch('/exercicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
    }

    if (resposta.ok) {
        exercicioEditando = null;

        document
            .getElementById('exercicioForm')
            .reset();

        bootstrap.Modal
            .getInstance(
                document.getElementById('modalExercicio')
            )
            .hide();

        carregarExercicios();
    }
}

async function deletarExercicio(id) {
    const confirmar =
        confirm('Deseja excluir este exercício?');

    if (!confirmar) return;

    await fetch(`/exercicios/${id}`, {
        method: 'DELETE'
    });

    carregarExercicios();
}

function abrirEditarExercicio(
    id,
    nome,
    descricao,
    categoria
) {
    exercicioEditando = id;

    document.getElementById('nome').value = nome;
    document.getElementById('descricao').value = descricao;
    document.getElementById('categoria').value = categoria;

    const modal = new bootstrap.Modal(
        document.getElementById('modalExercicio')
    );

    modal.show();
}