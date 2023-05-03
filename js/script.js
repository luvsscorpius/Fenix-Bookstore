
//funcoes auxiliares e uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

// converter para real
const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if (valor) {
        return valor.Tofixed(2)
    }
}

// Para abrir o modal
const abrirModal = () => {
    seleciona('.booksWindowArea').style.opacity = 0
    seleciona('.booksWindowArea').style.display = 'flex'
    setTimeout(() => { seleciona('.booksWindowArea').style.opacity = 1}, 150)
    // set timeout foi usado para dar animaç~çao na janela modal
}

// Função para fechar a janela modal
const fecharModal = () => {
    seleciona('.booksWindowArea').style.opacity = 0
    setTimeout(() => {
        seleciona('.booksWindowArea').style.display = 'none'
    }, 500)
}

const botoesFechar = () => {
    selecionaTodos('.booksInfo--cancelMobileButton, .booksInfo--cancelButton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
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

// funcao para preencher os dados no modal
const preencherDadosModal = (item) => {
    let id = seleciona('.book-item--id').innerHTML = item.id -1
    seleciona('.booksBig img').src = item.img
    seleciona('.booksInfo h1').innerHTML = item.name
    seleciona('.booksInfo--author').innerHTML = item.author
    seleciona('.booksInfo--desc').innerHTML = item.description
    seleciona('.booksInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

// Precisamos mapear os livros
produtosJson.map((item, index) => {
    let romanceItem = document.querySelector('.models .book-item').cloneNode(true) // cloneNode faz uma copia dos elementos
    let fantasiaItem = document.querySelector('.models .book-item').cloneNode(true)
    let infatisItem = document.querySelector('.models .book-item').cloneNode(true)
    let idiomasItem = document.querySelector('.models .book-item').cloneNode(true)
    let hqsmangasItem = document.querySelector('.models .book-item').cloneNode(true)
    let espiritualidadeItem = document.querySelector('.models .book-item').cloneNode(true)
    let autoAjudaItem = document.querySelector('.models .book-item').cloneNode(true)

    if (item.type == "Romance") {
        //agora que ja foi clonado precisamos colocar na main e fazer aparecer na tela
        seleciona('.romance-area').append(romanceItem)

        // agora que ja colocamos na main precisamos preencher os dados
        preencherDadosDoItem(romanceItem, item, index)

        romanceItem.querySelector('.book-item a').addEventListener('click', (e) => {
            e.preventDefault() // faz o a (link) não fazer o padrao dele que seria recarregar a página
            console.log('Clicou em um livro da área romance')

            // funcao abrir modal quando clicar em algum livro
            abrirModal()

            // funcao para preencher os dados dos livros na janela modal
            preencherDadosModal(item)

            // funcao para fechar a janela modal quando clicar em algum dos botoes de fechar
            botoesFechar()
        })
    }

    if (item.type == "Fantasia") {
        seleciona('.fantasia-area').append(fantasiaItem)

        preencherDadosDoItem(fantasiaItem, item, index)

        fantasiaItem.querySelector('.book-item a').addEventListener('click', (e) => {
            e.preventDefault()
            console.log('Clicou em um livro da área fantasia')

            abrirModal()
            preencherDadosModal(item)
            botoesFechar()
        })
    }

    if (item.type == 'infantis') {
        seleciona('.infatis-area').append(infatisItem)

        preencherDadosDoItem(infatisItem, item, index)

        infatisItem.querySelector('.book-item a').addEventListener('click', (e) => {
            e.preventDefault()
            console.log('Clicou em um livro da área infantil')

            abrirModal()
            preencherDadosModal(item)
            botoesFechar()
        })
    }

    if (item.type == "idiomas") {
        seleciona('.idiomas-area').append(idiomasItem)

        preencherDadosDoItem(idiomasItem, item, index)
        
        idiomasItem.querySelector('.book-item a').addEventListener('click', (e) => {
            e.preventDefault()
            console.log('Clicou em um livro da área de idiomas')

            abrirModal()
            preencherDadosModal(item)
            botoesFechar()
        })
    }

    if (item.type == "hqs-mangas") {
        seleciona('.hqs-area').append(hqsmangasItem)

        preencherDadosDoItem(hqsmangasItem, item, index)

        hqsmangasItem.querySelector('.book-item a').addEventListener('click', (e) => {
            e.preventDefault()
            console.log('Clicou em um livro da área hqs e mangas')

            abrirModal()
            preencherDadosModal(item)
            botoesFechar()
        })
    }

    if (item.type == "espiritualidade") {
        seleciona('.espiritualidade-area').append(espiritualidadeItem)

        preencherDadosDoItem(espiritualidadeItem, item, index)

        espiritualidadeItem.querySelector('.book-item a').addEventListener('click', (e) => {
            e.preventDefault()
            console.log('Clicou em um livro da área de espiritualidade e religião')

            abrirModal()
            preencherDadosModal(item)
            botoesFechar()
        })
    }

    if (item.type == "autoajuda") {
        seleciona('.auto-ajuda-area').append(autoAjudaItem)

        preencherDadosDoItem(autoAjudaItem, item, index)

        autoAjudaItem.querySelector('.book-item a').addEventListener('click', (e) => {
            e.preventDefault()
            console.log('Clicou em um livro da área de AutoAjuda')

            abrirModal()
            preencherDadosModal(item)
            botoesFechar()
        })
    }
})