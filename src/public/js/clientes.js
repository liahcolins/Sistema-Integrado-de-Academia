let clienteEditando = null;

document.addEventListener(
    'DOMContentLoaded',
    () => {

        carregarClientes();

        document
            .getElementById(
                'clienteForm'
            )
            .addEventListener(
                'submit',
                cadastrarCliente
            );

    }
);

async function carregarClientes() {

    const resposta =
        await fetch('/clientes');

    const clientes =
        await resposta.json();

    const tabela =
        document.getElementById(
            'clientesTable'
        );

    tabela.innerHTML = '';

    clientes.forEach(cliente => {

        tabela.innerHTML += `
            <tr>

                <td>${cliente.id}</td>

                <td>${cliente.nome}</td>

                <td>${cliente.email}</td>

                <td>
                    ${cliente.status_matricula}
                </td>

                <td>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="abrirEditarCliente(
                            ${cliente.id},
                            '${cliente.nome}',
                            '${cliente.email}',
                            '${cliente.status_matricula}'
                        )"
                    >
                        Editar
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deletarCliente(${cliente.id})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>
        `;

    });

}

async function cadastrarCliente(evento) {

    evento.preventDefault();

    const nome =
        document.getElementById(
            'nome'
        ).value;

    const email =
        document.getElementById(
            'email'
        ).value;

    const senha =
        document.getElementById(
            'senha'
        ).value;

    const status_matricula =
        document.getElementById(
            'status_matricula'
        ).value;

    const dados = {
        nome,
        email,
        senha,
        status_matricula
    };

    let resposta;

    if (clienteEditando !== null) {

        resposta =
            await fetch(
                `/clientes/${clienteEditando}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify(
                        dados
                    )
                }
            );

    } else {

        resposta =
            await fetch(
                '/clientes',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify(
                        dados
                    )
                }
            );

    }

    if (resposta.ok) {

        clienteEditando = null;

        document
            .getElementById(
                'clienteForm'
            )
            .reset();

        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalCliente'
                )
            )
            .hide();

        carregarClientes();
    }
}

async function deletarCliente(id) {

    const confirmar =
        confirm(
            'Deseja excluir este cliente?'
        );

    if (!confirmar) return;

    await fetch(
        `/clientes/${id}`,
        {
            method: 'DELETE'
        }
    );

    carregarClientes();
}

function abrirEditarCliente(
    id,
    nome,
    email,
    status
) {

    clienteEditando = id;

    document.getElementById(
        'nome'
    ).value = nome;

    document.getElementById(
        'email'
    ).value = email;

    document.getElementById(
        'senha'
    ).value = '';

    document.getElementById(
        'status_matricula'
    ).value = status;

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                'modalCliente'
            )
        );

    modal.show();
}