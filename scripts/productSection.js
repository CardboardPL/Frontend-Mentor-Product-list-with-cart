import {products} from '../data/products.js';
import {cart} from '../data/cart.js';
import {renderCartSection} from './cartSection.js';
import {formatCurrency} from './utils/money.js';

export function renderProductSection() {
  const html = `
    <h2 class="products-type">Desserts</h2>
    <ul class="products-list js-products-list">
      ${generateProductListHTML()}
    </ul>
  `;

  document.querySelector('.js-products-section').innerHTML = html;
  document.querySelectorAll('.js-product-add-to-cart-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.parentElement.dataset.product;
      cart.addToCart(productName);
      renderCartSection();
      renderProductSection();
    });
  });
  document.querySelectorAll('.js-cart-item-decrement-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.parentElement.parentElement.dataset.product;
      cart.decreaseCartItemQuantity(productName);
      renderCartSection();
      renderProductSection();
    });
  });
  document.querySelectorAll('.js-cart-item-increment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.parentElement.parentElement.dataset.product;
      cart.addToCart(productName);
      renderCartSection();
      renderProductSection();
    });
  });
}

function generateProductListHTML() {
  const productListHTML = products.reduce((html, product) => {
    const isSelected = cart.findCartItem(product.name);

    html += `
      <li class="product ${isSelected ? 'selected' : ''}">
        <img class="product-img" src="${product.image.thumbnail}" alt="${product.name} - ${product.category}">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${formatCurrency(product.price)}</p>
        <div class="product-actions" aria-label="Product Actions" data-product="${product.name}">
          <button class="product-add-to-cart-button js-product-add-to-cart-button">Add to Cart</button>
          <div class="product-cart-item-actions">
            <button class="product-cart-item-action-btn js-cart-item-decrement-btn">
              <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement Item Quantity">
            </button>
            
            <span class="product-cart-quantity">${isSelected ? isSelected.quantity : ''}</span>

            <button class="product-cart-item-action-btn js-cart-item-increment-btn">
              <img src="./assets/images/icon-increment-quantity.svg" alt="Increment Item Quantity">
            </button>
          </div>
        </div>
      </li>
    `;
    return html;
  }, '');

  return productListHTML;
}