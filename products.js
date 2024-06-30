// products.js
const apiUrl = 'https://gts.ir/wp-json/wc/v3/products';
const consumerKey = 'ck_c00be9ee123d4e9be4828e6f91fe4c83ca702934';
const consumerSecret = 'cs_45d51fcf952378c455a33a8e1250fa294672bb81';

async function fetchProducts() {
    const response = await fetch(apiUrl, {
        headers: {
            'Authorization': 'Basic ' + btoa(consumerKey + ':' + consumerSecret)
        }
    });
    const products = await response.json();
    return products;
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.className = 'product-item';

        const productImage = document.createElement('img');
        productImage.src = product.images[0] ? product.images[0].src : '';
        productImage.alt = product.name;

        const productName = document.createElement('a');
        productName.className = 'product-name';
        productName.href = product.permalink;
        productName.textContent = product.name;

        const productPrice = document.createElement('div');
        productPrice.className = 'product-price';
        productPrice.textContent = `قیمت: ${product.regular_price} تومان`;

        const productSalePrice = document.createElement('div');
        productSalePrice.className = 'product-sale-price';
        productSalePrice.textContent = product.sale_price ? `قیمت تخفیف خورده: ${product.sale_price} تومان` : '';

        const editLink = document.createElement('a');
        editLink.className = 'edit-link';
        editLink.href = `edit-product.html?id=${product.id}`;
        editLink.textContent = 'ویرایش محصول';

        listItem.appendChild(productImage);
        listItem.appendChild(productName);
        listItem.appendChild(productPrice);
        listItem.appendChild(productSalePrice);
        listItem.appendChild(editLink);
        productList.appendChild(listItem);
    });
}

async function init() {
    const products = await fetchProducts();
    displayProducts(products);
}

document.addEventListener('DOMContentLoaded', init);
