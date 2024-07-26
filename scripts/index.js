import {loadProducts} from '../data/products.js';
import {renderProductSection} from './productSection.js';
import {renderCartSection} from './cartSection.js';

loadProducts().then(() => {
  renderProductSection();
  renderCartSection();
});