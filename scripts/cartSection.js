import {cart} from '../data/cart.js';
import {formatCurrency} from './utils/money.js';
import {renderOrderConfirmation} from './orderConfirmation.js';
import {determineProductAttributes, updateProductCartQuantityUI} from './productSection.js';

export function renderCartSection() {
  const cartSectionHTML = `
    <h2 class="cart__header">Your Cart (<span class="cart-quantity">${cart.calculateCartQuantity()}</span>)</h2>
    ${cart.cartList.length ? generateCartListHTML() :
      `
        <div class="cart__empty">
          <img class="cart__empty-img" src="./assets/images/illustration-empty-cart.svg" alt="" aria-hidden="true">
          <p class="cart__empty-message">Your added items will appear here</p>
        </div>
      `
    }
  `;

  document.querySelector('.js-cart-section').innerHTML = cartSectionHTML;

  const removeCartItemButtons = document.querySelectorAll('.js-remove-cart-item-button');
  const confirmOrderButton = document.querySelector('.js-cart-confirm-order-button');

  if (removeCartItemButtons && confirmOrderButton) {
    removeCartItemButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const productName = btn.dataset.productName;
        cart.removeFromCart(productName);
        renderCartSection();
        determineProductAttributes(productName);
        updateProductCartQuantityUI(productName);
      });
    });

    confirmOrderButton.addEventListener('click', renderOrderConfirmation);
  }
}

function generateCartListHTML() {
  const cartListHTML = `
    <ul class="cart__list">
      ${cart.cartList.reduce((html, cartItem) => {
        return html + `
          <li class="cart-item">
            <div>
              <h3 class="cart-item__name">${cartItem.name}</h3>
              <p>
                <span class="cart-item__quantity">${cartItem.quantity}x</span>
                @
                <span class="cart-item__price">$${formatCurrency(cartItem.price)}</span>
                <span class="cart-item__total-price">$${formatCurrency(cartItem.calculateTotalItemPrice())}</span>
              </p>
            </div>
            <button class="cart-item__remove-button js-remove-cart-item-button" data-product-name="${cartItem.name}">
              <img src="./assets/images/icon-remove-item.svg" alt="Remove ${cartItem.name} from Cart">
            </button>
          </li>
        `
      }, '')}
    </ul>

    <p class="cart__order-total">Order Total 
      <span class="cart__total-price">$${formatCurrency(cart.calculateTotalCartPrice())}</span>
    </p>

    <p class="cart__delivery-message">
      <img src="./assets/images/icon-carbon-neutral.svg" alt="" aria-hidden="true">
      This is a <strong>carbon neutral</strong> delivery
    </p>

    <button class="cart__confirm-order-button js-cart-confirm-order-button">Confirm Order</button>
  `;

  return cartListHTML;
}