const express = require('express');
const jogadores = require('./controladores/jogadores');

const rotas = express();

//end points (CRUD PADRÃO)

rotas.get('/jogadores', jogadores.listarJogadores); //retorna todos os jogadores da database
rotas.get('/jogadores/:posicao', jogadores.listarPosicao); //retorna todos os jogadores da posicao passada
rotas.get('/jogadores/:id', jogadores.obterJogador); //retorna o jogador que corresponde ao id passado
rotas.post('/jogadores', jogadores.cadastrarJogador); //cadastra um novo jogador na database
rotas.put('/jogadores/:id', jogadores.atualizarJogador); //atualiza um jogador na database
rotas.delete('/jogadores/:id', jogadores.deletarJogador); //deleta um jogador na database


module.exports = rotas;