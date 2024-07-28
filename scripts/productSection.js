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
      const productName = btn.closest('.product-actions').dataset.product;
      cart.addToCart(productName);
      updateProductCartQuantityUI(
        btn.parentElement.querySelector('.js-product-cart-quantity'),
        productName
      );
      
      btn.closest('.product').classList.add('selected');
      
      renderCartSection();
    });
  });
  document.querySelectorAll('.js-cart-item-decrement-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.closest('.product-actions').dataset.product;

      cart.decreaseCartItemQuantity(productName);

      const isSelected = determineSelectedProductState(productName);
      
      if (!isSelected) {
        btn.closest('.product').classList.remove('selected');
      } else {
        updateProductCartQuantityUI(btn.nextElementSibling, productName);
      }

      renderCartSection();
    });
  });
  document.querySelectorAll('.js-cart-item-increment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.closest('.product-actions').dataset.product;

      cart.addToCart(productName);
      updateProductCartQuantityUI(btn.previousElementSibling, productName);
      renderCartSection();
    });
  });
}

function generateProductListHTML() {
  const productListHTML = products.reduce((html, product) => {
    const isSelected = cart.findCartItem(product.name);

    html += `
      <li class="product ${isSelected ? 'selected' : ''}">
        <img class="product-img" src="${product.image[currentViewType]}" alt="${product.name} - ${product.category}">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${formatCurrency(product.price)}</p>
        <div class="product-actions" aria-label="Product Actions" data-product="${product.name}">
          <button class="product-add-to-cart-button js-product-add-to-cart-button">
            <img class="product-add-to-cart-icon" src="./assets/images/icon-add-to-cart.svg" alt="" aria-hidden="true">
            Add to Cart
          </button>
          <div class="product-cart-item-actions">
            <button class="product-cart-item-action-btn js-cart-item-decrement-btn">
              <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement Item Quantity">
            </button>
            
            <span class="product-cart-quantity js-product-cart-quantity">${isSelected ? isSelected.quantity : ''}</span>

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

function updateProductCartQuantityUI(element, productName) {
  element.innerText = cart.findCartItem(productName).quantity;
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