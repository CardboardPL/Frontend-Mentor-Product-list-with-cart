import {findProduct} from './products.js';

class Cart {
  #cartListId;
  cartList;

  constructor(cartListId) {
    this.#cartListId = cartListId;

    const localCartList = JSON.parse(localStorage.getItem(this.#cartListId));
    this.cartList = Array.isArray(localCartList) ? localCartList.map(item => new CartItem(item.name, item.quantity, item.price)) : [];
  }

  #saveCartList() {
    localStorage.setItem(this.#cartListId, JSON.stringify(this.cartList));
  }

  findCartItem(productName) {
    return this.cartList.find(cartItem => cartItem.name === productName) || null;
  }

  addToCart(productName) {
    const cartItem = this.findCartItem(productName);

    if (cartItem) {
      cartItem.increaseItemQuantity();
    } else {
      const product = findProduct(productName);

      if (!product) return;

      this.cartList.push(new CartItem(productName, 1, product.price));
    }

    this.#saveCartList();
  }

  decreaseCartItemQuantity(productName) {
    const cartItem = this.findCartItem(productName);

    if (!cartItem) return;

    if (cartItem.quantity - 1 === 0) {
      this.removeFromCart(productName);
    } else {
      cartItem.decreaseItemQuantity();
    }

    this.#saveCartList();
  }

  removeFromCart(productName) {
    this.cartList = this.cartList.filter(cartItem => cartItem.name !== productName);
    this.#saveCartList();
  }

  clearCartList() {
    this.cartList = [];
    this.#saveCartList();
  }

  calculateCartQuantity() {
    return this.cartList.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }

  calculateTotalCartPrice() {
    return this.cartList.reduce((total, cartItem) => total + cartItem.calculateTotalItemPrice(), 0);
  }
};

class CartItem {
  name;
  quantity;
  price;

  constructor(name, quantity, price) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  increaseItemQuantity() {
    this.quantity++;
  }

  decreaseItemQuantity() {
    this.quantity--;
  }

  calculateTotalItemPrice() {
    return this.quantity * this.price;
  }
}

export const cart = new Cart('cartList-23977280401');