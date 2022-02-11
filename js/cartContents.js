if (inCart === null || Object.keys(inCart).length === 0) {
    document.getElementById("empty-cart").hidden = false;
    document.getElementById("nonempty-cart").hidden = true;
}
else {
    const productsTable = document.getElementById('products-table');

    for (let productKey in inCart) {
        const productRow = document.querySelector('[product-row]')
                            .content.cloneNode(true).children[0];
        
        const product = JSON.parse(productKey);

        productRow.querySelector('#product-id').textContent = product.id;
        productRow.querySelector('#title').textContent = product.title;
        productRow.querySelector('#quantity').textContent = inCart[productKey];
        productRow.querySelector('#price').textContent = '$' + (Math.round(inCart[productKey] * product.price * 100) / 100).toFixed(2);

        productRow.querySelector('#increase').addEventListener('click', function() {
            addToCart(JSON.parse(productKey));

            productRow.querySelector('#quantity').textContent = inCart[productKey];
            productRow.querySelector('#price').textContent = '$' + (Math.round(inCart[productKey] * product.price * 100) / 100).toFixed(2);
        });

        productRow.querySelector('#decrease').addEventListener('click', function() {
            removeFromCart(JSON.parse(productKey));

            if (!inCart[productKey]) {
                productRow.remove();
            }
            else {
                productRow.querySelector('#quantity').textContent = inCart[productKey];
                productRow.querySelector('#price').textContent = '$' + (Math.round(inCart[productKey] * product.price * 100) / 100).toFixed(2);
            }

            if (Object.keys(inCart).length === 0) {
                document.getElementById('empty-cart').hidden = false;
                document.getElementById("nonempty-cart").hidden = true;
            }
        });

        productsTable.append(productRow);
    }
}
