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
    setTimeout(() => { seleciona('.booksWindowArea').style.opacity = 1 }, 150)
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
        qtProduto++
        seleciona('.booksInfo--qt').innerHTML = qtProduto
    })

    seleciona('.booksInfo--qtmenos').addEventListener('click', () => {
        if (qtProduto > 1) {
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

const adicionarNoCarrinho = () => {
    seleciona('.booksInfo--addButton').addEventListener('click', () => {
        console.log('Produto adicionado ao carrinho')

        // pegar dados da janela modal atual
        // Qual produto?? pegue com a key modalKey

        if (modalKey == null) { alert('Modal Nula') }

        // tamanho
        let format = seleciona('.booksInfo-format.selected').getAttribute('data-key')
        console.log('Formato ' + format)

        // Quantidade
        console.log('Quantidade de produtos: ' + qtProduto)

        //preco 
        let price = seleciona('.booksInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
        console.log(price)

        // precisamos criar um identificador agora que junte id e tamanho
        let identificador = produtosJson[modalKey].id + 't' + format

        // antes de adicionar precisamos verificar se ja tem aquele codigo e tamanho
        let key = cart.findIndex((item) => item.identificador == identificador)
        console.log(key)

        if (key > -1) {
            // se encontrar aumente
            cart[key].qt += qtProduto
        } else {
            // adicionar produto no carrinho
            let produto = {
                identificador,
                id: produtosJson[modalKey].id,
                format,
                qt: qtProduto,
                price: parseFloat(price)
            }
            cart.push(produto)
            console.log(produto)
            console.log('Sub total R$ ' + (produto.qt + produto.price).toFixed(2))
        }
        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

// função para preencher no carrinho (atualizar)
const atualizarCarrinho = () => {
    // exibe a quantidade de itens no carrinho
    seleciona('.menu-openner span').innerHTML = cart.length

    if (cart.length > 0) {
        seleciona('aside').classList.add('show')

        // zerar o cart 
        seleciona('.cart').innerHTML = ''

        // variaveis antes do for
        let subtotal = 0
        let total = 0
        let desconto = 0

        // preencher os itens no carrinho e calcular subtotal
        for (let i in cart) {
            // use o find para pegar o item por id
            let produtoItem = produtosJson.find((item) => item.id == cart[i].id)
            console.log(produtoItem)

            //EM CADA ITEM pegar o subtotal
            subtotal += cart[i].price * cart[i].qt

            // fazer o clone, exibir produtos na tela (carrinho) e preencher as informações
            let cartItem = seleciona('.models .cart--item').cloneNode(true)
            seleciona('.cart').append(cartItem)

            let produtoFormatName = cart[i].format
            let produtoName = `${produtoItem.name} (${produtoFormatName})`

            //preencher as informações no carrinho
            cartItem.querySelector('img').src = produtoItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = produtoName
            cartItem.querySelector('.cart--item-qt').innerHTML = cart[i].qt

            // botões + e -

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                console.log('Clicou no botão de aumentar')
                cart[i].qt++
                atualizarCarrinho()
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                console.log('Clicou no botão de diminuir')
                if (cart[i].qt > 1) {
                    cart[i].qt--
                } else {
                    // remover se for zero
                    cart.splice(i, 1)
                }
                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''
                atualizarCarrinho()
            })
            seleciona('.cart').append(cartItem)

        }
        desconto = subtotal * 0
        total = subtotal - desconto

        // exibir na tela os resultados
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
        seleciona('.total span:last-child').innerHTML = formatoReal(total)
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
    } else {
        // ocultar o carrinho
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
    }
}

// função para finalizar a compra
const finalizarCompra = () => {
    // fechar o carrinho em mobile
    seleciona('.cart--finalizar').addEventListener('click', () => {
        seleciona('aside').classList.remove('show')
        console.log('Compra finalizada')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
        cart = []
        seleciona('.menu-openner span').innerHTML = cart.length
    })
}

// Função para abrir o carrinho
const abrirCarrinho = () => {
    console.log('Quantidade de itens do carrinho ' + cart.length)
    if (cart.length > 0) {
        //mostrar carrinho
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex'
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if (cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar carrinho com o x (span)
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
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
    let id = seleciona('.book-item--id').innerHTML = item.id - 1
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

            //muda os tamanhos
            mudaTamanhos(item.id)

            seleciona('.booksInfo--qt').innerHTML = qtRomance // definir a quantidade de produtos na modal como sempre 1 toda vez que abrir
            console.log(qtRomance)
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
            seleciona('.booksInfo--qt').innerHTML = qtFantasia
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
            seleciona('.booksInfo--qt').innerHTML = qtInfantis
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
            seleciona('.booksInfo--qt').innerHTML = qtIdiomas
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
            seleciona('.booksInfo--qt').innerHTML = qtHqsMangas
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
            seleciona('.booksInfo--qt').innerHTML = qtEspiritualidade
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
            seleciona('.booksInfo--qt').innerHTML = qtAutoAjuda
        })
    }
})

mudarQuantidade()
adicionarNoCarrinho()
finalizarCompra()
fecharCarrinho()
atualizarCarrinho()