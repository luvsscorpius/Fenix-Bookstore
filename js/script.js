
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
    let fantasiaItem = document.querySelector('.models .book-item').cloneNode(true)
    let infatisItem = document.querySelector('.models .book-item').cloneNode(true)
    let idiomasItem = document.querySelector('.models .book-item').cloneNode(true)
    let hqsmangasItem = document.querySelector('.models .book-item').cloneNode(true)
    let espiritualidadeItem = document.querySelector('.models .book-item').cloneNode(true)

    if (item.type == "Romance") {
        //agora que ja foi clonado precisamos colocar na main e fazer aparecer na tela
        seleciona('.romance-area').append(romanceItem)

        // agora que ja colocamos na main precisamos preencher os dados
        preencherDadosDoItem(romanceItem, item, index)
    }

    if (item.type == "Fantasia") {
        seleciona('.fantasia-area').append(fantasiaItem)

        preencherDadosDoItem(fantasiaItem, item, index)
    }

    if (item.type == 'infantis') {
        seleciona('.infatis-area').append(infatisItem)

        preencherDadosDoItem(infatisItem, item, index)
    }

    if (item.type == "idiomas") {
        seleciona('.idiomas-area').append(idiomasItem)

        preencherDadosDoItem(idiomasItem, item, index)
    }

    if (item.type == "hqs-mangas") {
        seleciona('.hqs-area').append(hqsmangasItem)

        preencherDadosDoItem(hqsmangasItem, item, index)
    }

    if (item.type == "espiritualidade") {
        seleciona('.espiritualidade-area').append(espiritualidadeItem)

        preencherDadosDoItem(espiritualidadeItem, item, index)
    }
})