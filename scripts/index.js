import {loadProducts} from '../data/products.js';
import {renderProductList} from './productList.js';

loadProducts().then(() => {
  renderProductList();
}); 