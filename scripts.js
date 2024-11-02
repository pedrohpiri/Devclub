// Seleciona os botões "Mostrar tudo", "Mapear", "Somar tudo" e "Filtrar"
const showAllButton = document.querySelector('.show-all');
const mapButton = document.getElementById('mapButton');
const sumButton = document.getElementById('sumButton');
const filterButton = document.getElementById('filterButton');

// Seleciona o elemento UL onde os produtos serão exibidos
const productList = document.querySelector('ul');

// Seleciona os elementos onde os totais serão exibidos
const totalPriceDisplay = document.getElementById('totalPrice');
const discountedPriceDisplay = document.getElementById('discountedPrice');

// Oculta os elementos de total inicialmente
totalPriceDisplay.style.display = 'none';
discountedPriceDisplay.style.display = 'none';

// Função para exibir uma lista de produtos
function exibirProdutos(produtos) {
    productList.innerHTML = '';
    produtos.forEach(item => {
        const productItem = document.createElement('li');
        const productImage = document.createElement('img');
        productImage.src = item.src;
        productImage.alt = item.name;
        const productName = document.createElement('p');
        productName.textContent = item.name;
        const productPrice = document.createElement('p');
        productPrice.classList.add('item-price');
        productPrice.textContent = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
        productItem.appendChild(productImage);
        productItem.appendChild(productName);
        productItem.appendChild(productPrice);
        productList.appendChild(productItem);
    });
    // Oculta os totais ao exibir produtos, a menos que seja para somar ou filtrar veganos
    totalPriceDisplay.style.display = 'none';
    discountedPriceDisplay.style.display = 'none';
}

// Função para exibir todos os produtos
function mostrarTodosProdutos() {
    exibirProdutos(menuOptions);
}

// Função para aplicar um desconto de 10% em todos os produtos
function aplicarDesconto() {
    const produtosComDesconto = menuOptions.map(item => ({
        ...item, price: item.price * 0.9
    }));
    exibirProdutos(produtosComDesconto);
}

// Função para calcular e exibir a soma de todos os preços com e sem desconto
function somarTodosOsProdutos() {
    // Calcula o total sem desconto
    const total = menuOptions.reduce((acc, item) => acc + item.price, 0);

    // Calcula o total com desconto de 10%
    const totalComDesconto = total * 0.9;

    // Exibe os valores nos elementos correspondentes
    totalPriceDisplay.textContent = `A soma de todos os itens é R$ ${total.toFixed(2).replace('.', ',')}`;
    discountedPriceDisplay.textContent = `A soma com 10% de desconto é R$ ${totalComDesconto.toFixed(2).replace('.', ',')}`;

    // Exibe os elementos de total e desconto
    totalPriceDisplay.style.display = 'block';
    discountedPriceDisplay.style.display = 'block';
}

// Função para exibir apenas produtos veganos e calcular a soma deles
function mostrarProdutosVeganos() {
    // Filtra os produtos para incluir apenas os que têm vegan: true
    const produtosVeganos = menuOptions.filter(item => item.vegan === true);
    
    // Calcula a soma dos produtos veganos
    const totalVegano = produtosVeganos.reduce((acc, item) => acc + item.price, 0);
    
    // Chama a função de exibição com os produtos veganos
    exibirProdutos(produtosVeganos);

    // Exibe o total dos produtos veganos
    totalPriceDisplay.textContent = `A soma dos produtos veganos é R$ ${totalVegano.toFixed(2).replace('.', ',')}`;
    totalPriceDisplay.style.display = 'block';
    discountedPriceDisplay.style.display = 'none'; // Oculta o preço com desconto ao filtrar veganos
}

// Adiciona o evento de clique aos botões
showAllButton.addEventListener('click', mostrarTodosProdutos);
mapButton.addEventListener('click', aplicarDesconto);
sumButton.addEventListener('click', somarTodosOsProdutos);
filterButton.addEventListener('click', mostrarProdutosVeganos);
