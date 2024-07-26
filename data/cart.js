import {findProduct} from './products.js';

class Cart {
  #cartListId;
  cartList;

  constructor(cartListId) {
    this.#cartListId = cartListId;

    const localCartList = JSON.parse(localStorage.getItem(this.#cartListId));
    this.cartList = Array.isArray(localCartList) ? localCartList : [];
  }

  #saveCartList() {
    localStorage.setItem(this.#cartListId, JSON.stringify(this.cartList));
  }

  findCartItem(productName) {
    return this.cartList.find(cartItem => cartItem.name === productName);
  }

  addToCart(productName) {
    const cartItem = this.findCartItem(productName);

    if (cartItem) {
      cartItem.increaseItemQuantity();
    } else {
      const product = findProduct(productName);

      if (!product) return;

      this.cartList.push(new CartItem(productName, product.price));
    }

    this.#saveCartList();
  }

  decreaseCartItemQuantity(productName) {
    const item = this.findCartItem(productName);

    if (item.quantity - 1 === 0) {
      this.removeFromCart(productName);
    } else {
      item.decreaseItemQuantity();
    }

    this.#saveCartList();
  }

  removeFromCart(productName) {
    this.cartList = this.cartList.filter(cartItem => cartItem.name !== productName);
    this.#saveCartList();
  }
};

class CartItem {
  name;
  quantity = 1;
  price;

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  increaseItemQuantity() {
    this.quantity++;
  }

  decreaseItemQuantity() {
    this.quantity--;
  }
}

export const cart = new Cart('cartList-23977280401');