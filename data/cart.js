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
      cartItem.quantity += 1;
    } else {
      const productPrice = findProduct(productName).price;

      if (!productPrice) return;

      this.cartList.push(new CartItem(productName, productPrice));
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
}

export const cart = new Cart('cartList-23977280401');