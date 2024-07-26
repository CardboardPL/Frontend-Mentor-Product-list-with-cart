import {products} from '../data/products.js';

export function renderProductList() {
  let productListHTML = products.reduce((html, product) => {
    html += `
      <li class="product">
        <img class="product-img" src="${product.image.thumbnail}" alt="${product.name} - ${product.category}">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-actions" aria-label="Product Actions" data-product="${product.name}">
          <button class="product-add-to-cart-button">Add to Cart</button>
          <div class="product-cart-item-actions">
            <button class="product-cart-item-action-btn">
              <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement Item Quantity">
            </button>
            
            <span class="product-cart-quantity"></span>

            <button class="product-cart-item-action-btn">
              <img src="./assets/images/icon-increment-quantity.svg" alt="Increment Item Quantity">
            </button>
          </div>
        </div>
      </li>
    `;
    return html;
  }, '');
  
  if (!productListHTML) return;

  document.querySelector('.js-products-list').innerHTML = productListHTML;
}