// const products_details=[
//   {
//     image:'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating:{
//       stars:4.5,
//       count:87
//     },
//     cost:1090
//   },
//   {
//     image:'images/products/intermediate-composite-basketball.jpg',
//     name:'Intermediate Size Basketball',
//     rating:{
//       stars:4.0,
//       count:127
//     },
//     cost:2095
//   },
//   {
//     image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name:'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating:{
//       stars:4.5,
//       count:56
//     },
//     cost:799
//   }
// ];

import { products_details } from '../data/products.js';
import { cart,cartitem_to_localstorage,addtocart } from '../data/cart.js';

let productHTML=''

products_details.forEach((product)=>{
  productHTML+=`
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
       ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${(product.rating.stars)*10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${product.priceCents/100}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js_addtocart_button" data-product-id='${product.id}'>
        Add to Cart
      </button>
    </div>
  `
});

// console.log(productHTML);

let grid_container = document.querySelector('.js_products_grid');
grid_container.innerHTML=productHTML;

let cart_quantity_no=0;

document.querySelectorAll('.js_addtocart_button')
  .forEach((add_cart_button)=>{
    add_cart_button.addEventListener('click',()=>{
      let productId=add_cart_button.dataset.productId;

      addtocart(productId);

      
     
      cart.forEach((item)=>{
        cart_quantity_no+=item.quantity;
      });

      let cart_quantity=document.querySelector('.js_cart_quantity');
      cart_quantity.innerHTML=cart_quantity_no;
      // console.log(cart_quantity_no);

      console.log(cart);
    })
  });

  cart.forEach((item)=>{
    cart_quantity_no+=item.quantity;
  });

  let cart_quantity=document.querySelector('.js_cart_quantity');
  cart_quantity.innerHTML=cart_quantity_no;