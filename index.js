const express = require('express');
const rotas = require('./rotas');

const app = express();
//'ensina' o express a trabalhar com json
app.use(express.json());
app.use(rotas);


app.listen(3000);