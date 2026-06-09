CREATE DATABASE IF NOT EXISTS academia;
USE academia;

CREATE TABLE administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE personal_trainer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cref VARCHAR(20) NOT NULL
);

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    status_matricula VARCHAR(20) NOT NULL
);

CREATE TABLE matricula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_inicio DATE NOT NULL,
    status VARCHAR(20) NOT NULL,

    cliente_id INT UNIQUE NOT NULL,

    CONSTRAINT fk_matricula_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES cliente(id)
        ON DELETE CASCADE
);

CREATE TABLE treino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_criacao DATE NOT NULL,
    observacoes TEXT,

    cliente_id INT NOT NULL,
    personal_id INT NOT NULL,

    CONSTRAINT fk_treino_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES cliente(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_treino_personal
        FOREIGN KEY (personal_id)
        REFERENCES personal_trainer(id)
        ON DELETE CASCADE
);

CREATE TABLE exercicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(50) NOT NULL
);

CREATE TABLE item_treino (
    id INT AUTO_INCREMENT PRIMARY KEY,

    treino_id INT NOT NULL,
    exercicio_id INT NOT NULL,

    series INT,
    repeticoes INT,
    peso DECIMAL(6,2),
    tempo INT,
    descanso INT,

    instrucoes TEXT,

    CONSTRAINT fk_item_treino
        FOREIGN KEY (treino_id)
        REFERENCES treino(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_item_exercicio
        FOREIGN KEY (exercicio_id)
        REFERENCES exercicio(id)
        ON DELETE CASCADE
);

CREATE TABLE exercicio_musculacao (
    exercicio_id INT PRIMARY KEY,
    grupo_muscular VARCHAR(50) NOT NULL,

    CONSTRAINT fk_musculacao_exercicio
        FOREIGN KEY (exercicio_id)
        REFERENCES exercicio(id)
        ON DELETE CASCADE
);

CREATE TABLE exercicio_aerobico (
    exercicio_id INT PRIMARY KEY,
    aparelho VARCHAR(50),

    CONSTRAINT fk_aerobico_exercicio
        FOREIGN KEY (exercicio_id)
        REFERENCES exercicio(id)
        ON DELETE CASCADE
);

CREATE TABLE aula (
    exercicio_id INT PRIMARY KEY,

    tipo VARCHAR(50),
    horario VARCHAR(30),
    professor VARCHAR(100),
    vagas INT,

    CONSTRAINT fk_aula_exercicio
        FOREIGN KEY (exercicio_id)
        REFERENCES exercicio(id)
        ON DELETE CASCADE
);
