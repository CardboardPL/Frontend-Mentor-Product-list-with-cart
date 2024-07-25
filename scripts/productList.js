import {products} from '../data/products.js';

export function renderProductList() {
  let productListHTML = products.reduce((html, product) => {
    html += `
      <li class="product">
        <img class="product-img" src="${product.image.thumbnail}" alt="${product.name} - ${product.category}">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price}</p>
        <button class="product-add-to-cart-button" data-product="${product.name}">Add to Cart</button>
      </li>
    `;
    return html;
  }, '');
  
  if (!productListHTML) return;

  document.querySelector('.js-products-list').innerHTML = productListHTML;
}