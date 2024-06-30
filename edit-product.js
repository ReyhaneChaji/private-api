// edit-product.js
const apiUrl = 'https://gts.ir/wp-json/wc/v3/products';
const consumerKey = 'ck_c00be9ee123d4e9be4828e6f91fe4c83ca702934';
const consumerSecret = 'cs_45d51fcf952378c455a33a8e1250fa294672bb81';

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

async function fetchProduct() {
    const response = await fetch(`${apiUrl}/${productId}`, {
        headers: {
            'Authorization': 'Basic ' + btoa(consumerKey + ':' + consumerSecret)
        }
    });
    const product = await response.json();
    return product;
}

async function updateProduct(name, regularPrice, salePrice) {
    const response = await fetch(`${apiUrl}/${productId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            regular_price: regularPrice,
            sale_price: salePrice
        })
    });
    const updatedProduct = await response.json();
    return updatedProduct;
}

document.getElementById('edit-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const regularPrice = document.getElementById('product-regular-price').value;
    const salePrice = document.getElementById('product-sale-price').value || null;
    const updatedProduct = await updateProduct(name, regularPrice, salePrice);
    alert('تغییرات با موفقیت ذخیره شد!');
});

async function init() {
    const product = await fetchProduct();
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-regular-price').value = product.regular_price;
    document.getElementById('product-sale-price').value = product.sale_price || '';
}

document.addEventListener('DOMContentLoaded', init);
