import {cart} from '../data/cart.js';
import {formatCurrency} from './utils/money.js';
import {renderCartSection} from './cartSection.js';
import {findProduct} from '../data/products.js';
import {resetProductList} from './productSection.js';

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
        resetProductList();
      });
  });

  orderConfirmationModal.querySelector('.js-confirm-order-no').addEventListener('click', () => {
    orderConfirmationModal.close();
  });
}

function generateOrderConfirmationHTML() {
  const html = `
    <h2 class="order-modal__header">Are you sure with your order?</h2>

    <div class="order-modal__confirmation">
      <button class="order-modal__confirm-yes js-confirm-order-yes">Yes</button>
      <button class="order-modal__confirm-no js-confirm-order-no">No</button>
    </div>
  `;

  return html;
}

function generateOrderConfirmedHTML() {
  const html = `
    <img class="order-modal__confirmed-img" src="./assets/images/icon-order-confirmed.svg" alt="" aria-hidden="true">
    <h2 class="order-modal__header">Order Confirmed</h2>
    <p class="order-modal__message">We hope you enjoy your food!</p>

    <div class="order-modal__items-wrapper">
      <ul class="order-modal__list">
        ${generateOrderItemsHTML()}
      </ul>
      <p class="order-modal__items-total">Order total
        <span class="order-modal__items-total-price">$${formatCurrency(cart.calculateTotalCartPrice())}</span>
      </p>
    </div>

    <button class="order-modal__start-new-order-button js-start-new-order-button">Start new order</button>
  `;

  return html;
}

function generateOrderItemsHTML() {
  return cart.cartList.reduce((html, cartItem) => {
    const product = findProduct(cartItem.name);

    const orderItemHTML = `
      <li class="order-item">
        <div>
          <img class="order-item__thumbnail" src="${product.image.thumbnail}" alt="" aria-hidden="true">
          <p class="order-item__name">${cartItem.name}</p>
          <p>
            <span class="order-item__quantity">${cartItem.quantity}x</span> @
            <span class="order-item__price">$${formatCurrency(cartItem.price)}</span>
          </p>
        </div>

        <p class="order-item__total-price">$${formatCurrency(cartItem.calculateTotalItemPrice())}</p>
      </li>
    `

    return html + orderItemHTML;
  }, '');
}