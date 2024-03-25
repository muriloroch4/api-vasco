//pasta que controla as rotas (endpoints)
const conexao = require('../conexao');

async function listarJogadores(req, res) {
    try {
        const { rows: jogadores } = await conexao.query('SELECT * FROM vasco_jogadores');
        return res.status(200).json(jogadores);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

async function listarPosicao(req, res) {
    const { posicao } = req.params;

    try {
        const { rows: jogadoresPosicao} = await conexao.query('SELECT * FROM vasco_jogadores WHERE posicao = $1', [posicao]);

        return res.status(200).json(jogadoresPosicao);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

async function obterJogador(req, res) {
    const { id } = req.params;
    try {
        const jogador = await conexao.query('SELECT * FROM vasco_jogadores WHERE id = $1', [id]);

        if (jogador.rowCount === 0) {
            return res.status(404).json('Informe um ID existente');
        }

        return res.status(200).json(jogador.rows);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

async function cadastrarJogador(req, res) {
    const { nome, apelido, idade, posicao, nascimento, local_nascimento, estado, altura, peso } = req.body;

    if (!nome || !idade || !posicao || !nascimento || !local_nascimento || !estado || !altura || !peso) {
        return res.status(400).json('Informe todos os campos obrigatórios');
    }

    try {
        const novoJogador = await conexao.query('INSERT INTO vasco_jogadores (nome, apelido, idade, posicao, nascimento, local_nascimento, estado, altura, peso) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [nome, apelido, idade, posicao, nascimento, local_nascimento, estado, altura, peso]);

        if (novoJogador.rowCount === 0) {
            return res.status(400).json('Não foi possivel incluir o jogador na base de dados.');
        }

        return res.status(200).json('Jogador incluido com sucesso na base de dados.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

async function atualizarJogador(req, res) {
    const { id } = req.params;
    const { nome, apelido, idade, posicao, nascimento, local_nascimento, estado, altura, peso } = req.body;

    try {
        const jogador = await conexao.query('SELECT * FROM vasco_jogadores WHERE id = $1', [id]);

        if (jogador.rowCount === 0) {
            return res.status(404).json('Jogador não encontrado na base de dados.');
        }

        if (!nome || !idade || !posicao || !nascimento || !local_nascimento || !estado || !altura || !peso) {
            return res.status(400).json('Informe todos os campos obrigatórios.');
        }

        const jogadorAtualizado = await conexao.query('UPDATE vasco_jogadores SET nome = $1, apelido = $2, idade = $3, posicao = $4, nascimento = $5, local_nascimento = $6, estado = $7, altura = $8, peso = $9 WHERE id = $10', [nome, apelido, idade, posicao, nascimento, local_nascimento, estado, altura, peso, id]);

        if (jogadorAtualizado.rowCount === 0) {
            return res.status(200).json(`Não foi possivel atualizar o jogador ${nome}`);
        }

        return res.status(200).json('Jogador atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

async function deletarJogador(req, res) {
    const { id } = req.params;
    try {
        const jogador = await conexao.query('SELECT * FROM vasco_jogadores WHERE id = $1', [id]);

        if (jogador.rowCount === 0) {
            return res.status(404).json('Jogador não encontrado na base de dados.');
        };

        const deletJogador = await conexao.query('DELETE FROM vasco_jogadores WHERE id = $1', [id]);

        if (deletJogador.rowCount === 0) {
            return res.status(404).json('Não foi possível deletar o jogador da base de dados.');
        };

        return res.status(200).json('Jogador deletado com sucesso da base de dados.');
    } catch (error) {
        return res.status(400).json(error.message);
    }

};

//depois de criadas, exportam para serem usadas no arquivo de rotas como propriedades de um objeto
module.exports = {
    listarJogadores,
    listarPosicao,
    obterJogador,
    cadastrarJogador,
    atualizarJogador,
    deletarJogador
};



