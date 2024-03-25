//conexão entre o postgree e o npm

const { Pool } = require('pg');

//instancia o pool e configura a conexão
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vasco',
    password: 'mjogador80',
    port: 5432
});

//função para fazer as querys diretamente do npm
function query(text, param) {
    return pool.query(text, param);
}

module.exports = {
    query
};