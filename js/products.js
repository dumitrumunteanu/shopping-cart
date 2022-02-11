"use strict"

async function fetchProducts() {
    let products = localStorage.getItem('products');

    if (products === null) {
        const response = await fetch('https://fakestoreapi.com/products');
        const result = await response.json();

        products = result.map(product => {
            return {
                id: product.id,
                title: product.title,
                image: product.image,
                price: (Math.round(product.price * 100) / 100).toFixed(2),
                rating: Math.round(product.rating.rate),
            }
        });

        localStorage.setItem('products', JSON.stringify(products));
    }
    else {
        products = JSON.parse(products);
    }

    return products;
}

const productsContainer = document.getElementById('products-container');

fetchProducts().then(products => {
    products.forEach(product => {
        const productCard = document.querySelector('[product-card-template]')
                            .content.cloneNode(true).children[0];

        productCard.querySelector('#image').src = product.image;
        productCard.querySelector('#card-title').textContent = product.title;

        let rating = productCard.querySelector('#rating');
        for (let i = 0; i < 5; i++) {
            rating.innerHTML += (i < product.rating) ? '<div class="text-warning bi-star-fill"></div>' : '<div class="text-muted bi-star-fill"></div>';
        }

        productCard.querySelector('#price').textContent = '$' + product.price;

        let button = productCard.querySelector('.add-to-cart');
        button.addEventListener('click', function() {
            addToCart(product);
        });

        productsContainer.append(productCard);
    });
});