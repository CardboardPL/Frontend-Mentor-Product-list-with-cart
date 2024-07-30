import {products} from '../data/products.js';
import {cart} from '../data/cart.js';
import {renderCartSection} from './cartSection.js';
import {formatCurrency} from './utils/money.js';

let currentViewType = determineViewType();

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
      const productName = btn.closest('.product').dataset.product;
      cart.addToCart(productName);
      determineProductAttributes(productName);
      updateProductCartQuantityUI(productName);
      renderCartSection();
    });
  });
  document.querySelectorAll('.js-cart-item-decrement-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.closest('.product').dataset.product;

      cart.decreaseCartItemQuantity(productName);

      const isSelected = determineSelectedProductState(productName);
      
      if (!isSelected) {
        determineProductAttributes(productName);
      }

      updateProductCartQuantityUI(productName);
      renderCartSection();
    });
  });
  document.querySelectorAll('.js-cart-item-increment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.closest('.product').dataset.product;
      cart.addToCart(productName);
      updateProductCartQuantityUI(productName);
      renderCartSection();
    });
  });
}

function generateProductListHTML() {
  const productListHTML = products.reduce((html, product) => {
    const cartItem = cart.findCartItem(product.name);

    html += `
      <li class="product ${cartItem ? 'selected' : ''}" data-product="${product.name}">
        <img class="product-img" src="${product.image[currentViewType]}" alt="${product.name} - ${product.category}">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${formatCurrency(product.price)}</p>
        <div class="product-actions" aria-label="Product Actions">
          <button class="product-add-to-cart-button js-product-add-to-cart-button" ${cartItem ? 'disabled="true"' : ''}>
            <img class="product-add-to-cart-icon" src="./assets/images/icon-add-to-cart.svg" alt="" aria-hidden="true">
            Add to Cart
          </button>
          <div class="product-cart-item-actions">
            <button class="product-cart-item-action-btn js-product-cart-item-action-btn js-cart-item-decrement-btn" ${!cartItem ? 'disabled' : ''}>
              <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement Item Quantity">
            </button>
            
            <span class="product-cart-quantity js-product-cart-quantity">${cartItem ? cartItem.quantity : 0}</span>

            <button class="product-cart-item-action-btn js-product-cart-item-action-btn js-cart-item-increment-btn" ${!cartItem ? 'disabled' : ''}>
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

function determineViewType() {
  const screenWidth = window.screen.width;
  let viewType = 'mobile';

  if (screenWidth >= 800) {
    viewType = 'desktop';
  } else if (screenWidth >= 600) {
    viewType = 'tablet';
  }

  return viewType;
}

export function determineProductAttributes(productName) {
  const productElement = document.querySelector(`[data-product="${productName}"]`);

  if (!productElement) {
    console.error(`Product: ${productName} was not found in the list`);
    return;
  }

  productElement.classList.toggle('selected');
  productElement.querySelector('.js-product-add-to-cart-button').toggleAttribute('disabled');
  productElement.querySelectorAll('.js-product-cart-item-action-btn').forEach(btn => {
    btn.toggleAttribute('disabled');
  });
}

export function updateProductCartQuantityUI(productName) {
  const productElement = document.querySelector(`[data-product="${productName}"]`);

  if (!productElement) {
    console.error(`Product: ${productName} was not found in the list`);
    return;
  }

  const cartItem = cart.findCartItem(productName);
  productElement.querySelector('.js-product-cart-quantity').innerText = cartItem ? cartItem.quantity : 0;
}

function determineSelectedProductState(productName) {
  return cart.findCartItem(productName) !== null;
}

window.addEventListener('resize', () => {
  const viewType = determineViewType();
  if (currentViewType !== viewType) {
    currentViewType = viewType;
    renderProductSection();
  }
});