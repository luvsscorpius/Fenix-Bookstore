// variaveis globais

let modalKey = 0
let cart = []

let qtProduto = 1
let qtRomance = 1
let qtFantasia = 1
let qtInfantis = 1
let qtIdiomas = 1
let qtHqsMangas = 1
let qtEspiritualidade = 1
let qtAutoAjuda = 1

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

// Função para mudar a quantidade
const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.booksInfo--qtmais').addEventListener('click', () => {
        qtProduto ++
        seleciona('.booksInfo--qt').innerHTML = qtProduto
    })
    
    seleciona('.booksInfo--qtmenos').addEventListener('click', () =>{
        if (qtProduto > 1){
            qtProduto--
            seleciona('.booksInfo--qt').innerHTML = qtProduto
        }
    })
}

// Função para pegar a chave do item que voce está clicando
const pegarKey = (e) => {
    let key = e.target.closest('.book-item').getAttribute('data-key')
    console.log('Produto clicado: ' + key)
    console.log(produtosJson[key])

    // Garantir que a quantidade de produtos seja 1
    qtProduto = 1

    //Manter a informação de qual produto foi clicado
    modalKey = key

    return key
}

// Função para preencher os tamanhos
const preencherTamanhos = (key) => {
    // ações no tamanho 
    seleciona('.booksInfo-format.selected').classList.remove('selected')

    selecionaTodos('.booksInfo-format').forEach((size, sizeIndex) => {
        (sizeIndex == 2) ? size.classList.add('selected') : ''
    })
}

const mudaTamanhos = (key) => {
    // acões nos botões de tamanho e altera os preços
    selecionaTodos('.booksInfo-format').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            seleciona('.booksInfo-format.selected').classList.remove('selected')
            size.classList.add('selected')

            seleciona('.booksInfo--actualPrice').innerHTML = formatoReal(produtosJson[key].price[sizeIndex])
        })
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

            // funcao para pegar a chave
            let chave = pegarKey(e)

            // preenche os tamanhos
            preencherTamanhos(item.id)

            preencherTamanhos(item.id)
            mudaTamanhos(item.id)
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
            let chave = pegarKey(e)
            preencherTamanhos(item.id)
            preencherTamanhos(item.id)
            mudaTamanhos(item.id)
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
            let chave = pegarKey(e)
            preencherTamanhos(item.id)
            mudaTamanhos(item.id)
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
            let chave = pegarKey(e)
            preencherTamanhos(item.id)
            mudaTamanhos(item.id)
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
            let chave = pegarKey(e)
            preencherTamanhos(item.id)
            mudaTamanhos(item.id)
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
            let chave = pegarKey(e)
            preencherTamanhos(item.id)
            mudaTamanhos(item.id)
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
            let chave = pegarKey(e)
            preencherTamanhos(item.id)
            mudaTamanhos(item.id)
        })
    }
})

mudarQuantidade()