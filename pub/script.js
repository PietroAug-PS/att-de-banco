const botao = document.getElementById('load-products');
const tabelaProdutos = document.getElementById('product-table');

botao.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/produtos');
        const produtos = await response.json();
        produtos.forEach(produto => {
            const tr = document.createElement
            ('tr').innerHTML = `
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>${produto.estoque}</td>
            `;
            tabelaProdutos.appendChild(tr);
        });
        tabelaProdutos.appendChild(`
            <tr>
                <td colspan="3">Quantidade de Produtos: ${produtos.lenght}
            </tr>
        `);
    } catch (erro) {
        tabelaProdutos.appendChild(`
            <tr>
                <td colspan="3" style="color: red; text-align: center">
                    Error loading the products, try again later . . .
                </td>
            </tr>
        `);
        console.log("Erro: " + erro);
    }
})