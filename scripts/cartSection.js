import {cart} from '../data/cart.js'

export function renderCartSection() {
  const cartSectionHTML = `
    <h2 class="cart-header">Your Cart (<span class="cart-quantity">${cart.calculateCartQuantity()}</span>)</h2>
    <div class="cart-content">
      ${cart.cartList.length ? generateCartListHTML() : 
        `
          <div class="cart-empty-content">
            <img class="cart-empty-image" src="./assets//images/illustration-empty-cart.svg" alt="" aria-hidden="true">
            <p class="cart-empty-message">Your added items will appear here</p>
          </div>
        `
      }
    </div>
  `;

  document.querySelector('.js-cart-section').innerHTML = cartSectionHTML;

  document.querySelectorAll('.js-remove-cart-item-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.dataset.productName;
      cart.removeFromCart(productName);
      renderCartSection();
    });
  });
}

function generateCartListHTML() {
  const cartListHTML = `
    <ul class="cart-list">
      ${cart.cartList.reduce((html, cartItem) => {
        return html + `
          <li class="cart-list-item">
            <div>
              <h3>${cartItem.name}</h3>
              <p>
                <span class="item-quantity">${cartItem.quantity}x</span>
                @
                <span class="item-price">$${cartItem.price.toFixed(2)}</span>
                <span class="item-total-price">$${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
              </p>
            </div>
            <button class="remove-cart-item-button js-remove-cart-item-button" data-product-name="${cartItem.name}">
              <img src="../assets/images/icon-remove-item.svg" alt="Remove ${cartItem.name} from Cart">
            </button>
          </li>
        `
      }, '')}
    </ul>

    <p class="cart-order-total">Order Total 
      <span class="cart-total-price">$${
        cart.cartList.reduce((total, cartItem) => {
          return total + cartItem.price * cartItem.quantity;
        }, 0).toFixed(2)
      }</span>
    </p>

    <p class="cart-delivery-message">
      <img src="../assets/images/icon-carbon-neutral.svg" alt="" aria-hidden="true">
      This is a <strong>carbon neutral</strong> delivery
    </p>

    <button class="cart-confirm-order-button">Confirm Order</button>
  `;

  return cartListHTML;
}