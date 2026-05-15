const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = 3000;
const BASEDADOS = path.join(__dirname, "banco.txt");

const app = express();
app.use(express.static(path.join(__dirname, 'pub')));
app.use(express.json());

app.get('/api/produtos', async (req, res) => {
    try {
        const produtos = await lerProdutos();   
        res.json(produtos);
    } catch (error) {
        console.error(error);
        res.status(500)
           .send('Erro ao ler os produtos');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ligado em http://localhost:${PORT}`)
});

async function lerProdutos() {
    const dados = (await fs.promises,fs.readFile(BASEDADOS, "utf-8"))
                                       .trim()
                                       .split(/\r?\n/);

    const produtos = [];
    dados.forEach(dado => {
        produtos.push(new produtos(dado));
    });

    return produtos;
};

function Produto(dados) {
    const propriedades = dados.split('|');
    const prod = {};
    propriedades.forEach(propriedade => {
        const valores = propriedade.split(':');
        prod[valores[0].trim()] = valores[1].trim();
    });
    this.nome = prod.nome;
    this.preco = Number.parseFloat(prod.preco);
    this.estoque = Number.parseInt(prod.estoque);
};