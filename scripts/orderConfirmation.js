import {cart} from '../data/cart.js';
import {formatCurrency} from './utils/money.js';
import {renderCartSection} from './cartSection.js';
import {findProduct} from '../data/products.js';
import {renderProductSection} from './productSection.js';

export function renderOrderConfirmation() {
  const orderConfirmationModal = document.querySelector('.js-order-confirmation-modal');

  orderConfirmationModal.innerHTML = generateOrderConfirmationHTML();
  orderConfirmationModal.showModal();

  orderConfirmationModal.querySelector('.js-confirm-order-yes').addEventListener('click', () => {
    orderConfirmationModal.innerHTML = generateOrderConfirmedHTML();

    cart.clearCartList();

    orderConfirmationModal.querySelector('.js-start-new-order-button').addEventListener('click', () => {
        orderConfirmationModal.close();
        renderCartSection();
        renderProductSection();
      });
  });

  orderConfirmationModal.querySelector('.js-confirm-order-no').addEventListener('click', () => {
    orderConfirmationModal.close();
  });
}

function generateOrderConfirmationHTML() {
  const html = `
    <h2>Are you sure with your order?</h2>

    <div class="order-confirmation-actions">
      <button class="confirm-order-yes js-confirm-order-yes">Yes</button>
      <button class="confirm-order-no js-confirm-order-no">No</button>
    </div>
  `;

  return html;
}

function generateOrderConfirmedHTML() {
  const html = `
    <img src="./assets/images/icon-order-confirmed.svg" alt="" aria-hidden="true">
    <h2 class="order-confirmed-header">Order Confirmed</h2>
    <p class="order-confirmed-message">We hope you enjoy your food!</p>

    <div class="order-confirmed-items-wrapper">
      <ul class="order-items-list">
        ${generateOrderItemsHTML()}
      </ul>
      <p class="order-confirmed-total">Order total
        <span class="order-confirmed-total-price">$${formatCurrency(cart.calculateTotalCartPrice())}</span>
      </p>
    </div>

    <button class="start-new-order-button js-start-new-order-button">Start new order</button>
  `;

  return html;
}

function generateOrderItemsHTML() {
  return cart.cartList.reduce((html, cartItem) => {
    const product = findProduct(cartItem.name);

    const orderItemHTML = `
      <li class="order-item">
        <div>
          <img src="${product.image.thumbnail}" alt="" aria-hidden="true" class="order-item-thumbnail">
          <p class="order-item-name">${cartItem.name}</p>
          <p>
            <span class="order-item-quantity">${cartItem.quantity}x</span> @
            <span class="order-item-price">$${formatCurrency(cartItem.price)}</span>
          </p>
        </div>

        <p class="order-item-total-price">$${formatCurrency(cartItem.calculateTotalItemPrice())}</p>
      </li>
    `

    return html + orderItemHTML;
  }, '');
}