let personalEditando = null;

document.addEventListener('DOMContentLoaded', () => {
    carregarPersonais();

    document
        .getElementById('personalForm')
        .addEventListener('submit', cadastrarPersonal);
});

async function carregarPersonais() {
    const resposta = await fetch('/personal-trainers');
    const personais = await resposta.json();

    const tabela = document.getElementById('personaisTable');
    tabela.innerHTML = '';

    personais.forEach(personal => {
        tabela.innerHTML += `
            <tr>
                <td>${personal.id}</td>
                <td>${personal.nome}</td>
                <td>${personal.email}</td>
                <td>${personal.cref}</td>

                <td>
                    <div class="action-buttons">
                        <button
                            class="edit-btn"
                            onclick="abrirEditarPersonal(
                                ${personal.id},
                                '${personal.nome}',
                                '${personal.email}',
                                '${personal.cref}'
                            )"
                        >
                            Editar
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deletarPersonal(${personal.id})"
                        >
                            Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

async function cadastrarPersonal(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const cref = document.getElementById('cref').value;

    const dados = {
        nome,
        email,
        senha,
        cref
    };

    let resposta;

    if (personalEditando !== null) {
        resposta = await fetch(
            `/personal-trainers/${personalEditando}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            }
        );
    } else {
        resposta = await fetch(
            '/personal-trainers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            }
        );
    }

    if (resposta.ok) {
        personalEditando = null;

        document
            .getElementById('personalForm')
            .reset();

        bootstrap.Modal
            .getInstance(
                document.getElementById('modalPersonal')
            )
            .hide();

        carregarPersonais();
    }
}

async function deletarPersonal(id) {
    const confirmar = confirm(
        'Deseja excluir este personal?'
    );

    if (!confirmar) return;

    await fetch(`/personal-trainers/${id}`, {
        method: 'DELETE'
    });

    carregarPersonais();
}

function abrirEditarPersonal(
    id,
    nome,
    email,
    cref
) {
    personalEditando = id;

    document.getElementById('nome').value = nome;
    document.getElementById('email').value = email;
    document.getElementById('senha').value = '';
    document.getElementById('cref').value = cref;

    const modal = new bootstrap.Modal(
        document.getElementById('modalPersonal')
    );

    modal.show();
}