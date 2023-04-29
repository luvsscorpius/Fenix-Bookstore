
//funcoes auxiliares e uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorall(elemento)

// converter para real
const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if (valor) {
        return valor.Tofixed(2)
    }
}

// funcao para preencher os dados dos livros na main
const preencherDadosDoItem = (itemElement, item, index) => {
    itemElement.setAttribute('data-key', index)
    itemElement.querySelector('.book-item--id').value = index
    itemElement.querySelector('.book-item--img img').src = item.img
    itemElement.querySelector('.book-item--author').innerHTML = item.author
    itemElement.querySelector('.book-item--name').innerHTML = item.name
    itemElement.querySelector('.book-item--price').innerHTML = formatoReal(item.price[1])
}

// Precisamos mapear os livros
produtosJson.map((item, index) => {
    let romanceItem = document.querySelector('.models .book-item').cloneNode(true) // cloneNode faz uma copia dos elementos

    if (item.type == "Romance") {
        //agora que ja foi clonado precisamos colocar na main e fazer aparecer na tela
        seleciona('.romance-area').append(romanceItem)

        // agora que ja colocamos na main precisamos preencher os dados
        preencherDadosDoItem(romanceItem, item, index)
    }
})