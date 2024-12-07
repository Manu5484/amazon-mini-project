import { products_details } from '../data/products.js';
import { cart , remove_cartItem, cartitem_to_localstorage,updatedelivaryoption,addtocart } from '../data/cart.js';
import '../data/cartoops.js' ;
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryoption,deliveryoptions } from '../data/deliveryoption.js';

// console.log('hello');

// console.log(dayjs().add(2,'days'));
// console.log(dayjs().format('dddd, MMMM D'));

function rendercheckouthtml()
{

 let cart_item_html='';

cart.forEach((cart_item)=>{
  let productId=cart_item.productId;

  let matching_product;
  products_details.forEach((product_item)=>{
    if(productId===product_item.id)
    {
      matching_product=product_item;
    }
  });
  // console.log(matching_product);

  const today=dayjs();

  let deliveryoptionid=cart_item.deliveryid;

  let deliverydata;

  deliveryoption.forEach((option)=>{
    if(option.deliveryid==deliveryoptionid)
    {
      deliverydata=option;
    }
  })

  let deliverydate=dayjs().add(`${deliverydata.date}`,'days');
  let formateddate=deliverydate.format('dddd, MMMM D');

  cart_item_html +=
  `
  <div class="cart-item-container-${matching_product.id}">
    <div class="delivery-date  js_delivery_date">
      Delivery date: ${formateddate}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matching_product.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matching_product.name}
        </div>
        <div class="product-price">
          ${(matching_product.priceCents / 100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cart_item.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-cart" data-product-id=${matching_product.id}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title ">
          Choose a delivery option:
        </div>
       ${deliveryoptions(matching_product,cart_item)}
      </div>
    </div>
  </div>
  `;

});

// console.log(cart_item_html);




// console.log(cart_item_html);

document.querySelector('.order-summary')
  .innerHTML=cart_item_html;  

document.querySelectorAll('.js-delete-cart')
  .forEach((delete_cart_button)=>{
    let productId = delete_cart_button.dataset.productId;
    delete_cart_button.addEventListener('click',()=>{

    remove_cartItem(productId);
    let cart_item_container=document.querySelector(`.cart-item-container-${productId}`);
    // console.log(cart_item_container);

    cart_item_container.remove();

  })
});

document.querySelectorAll('.js_delivary_option')
.forEach((delivery_option)=>{
  delivery_option.addEventListener('click',()=>{
    let{deliveryId,cartproductId}=delivery_option.dataset;
    updatedelivaryoption(deliveryId,cartproductId);
    rendercheckouthtml();
    orderpaymentsummary();
    // let match;
    // deliveryoption.forEach((deliver_op)=>{
    //   if(deliver_op.deliveryid===deliveryId)
    //   {
    //     match=deliver_op;
    //   }
    // })

    // let delivery_date= dayjs().add(match.date,'days');
    // let formatdate=delivery_date.format('dddd, MMMM D');

    // document.querySelector('.js_delivery_date').innerHTML=`Delivery date: ${formatdate}`;
    // let match;
    // let pakkamatching;
    // cart.forEach((cartitem)=>{
    //   if(cartproductId===cartitem.productId){
    //     match=cartitem;
    //   }
    // })

    // if(match.deliveryid===deliveryId){
    //   pakkamatching=
    // }


    //  let deliverydata=dayjs().add(match.)
    
  });
});


}

rendercheckouthtml();

function orderpaymentsummary()
{
  let matching_product;
  let matching_delivery;
  let productprice=0;
  let deliveryprice=0,totalbeforetax=0;
  cart.forEach((cart_item)=>{
    let cart_item_id=cart_item.productId;
    products_details.forEach((product_item)=>{
      if(cart_item_id===product_item.id){
        matching_product=product_item;
      }
    })
    productprice+=matching_product.priceCents*cart_item.quantity;
    let cart_item_deliveryid=cart_item.deliveryid;
    deliveryoption.forEach((delivery_item)=>{
      if(cart_item_deliveryid===delivery_item.deliveryid)
      {
        matching_delivery=delivery_item;
      }
    })
    deliveryprice+=matching_delivery.pricecents;
  });
 
  totalbeforetax=productprice+deliveryprice;
  let tax=totalbeforetax*0.1;
  let ordertotal=totalbeforetax+tax;

  let paymenthtml=`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${(productprice/100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${(deliveryprice/100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${(totalbeforetax/100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${(tax/100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${(ordertotal/100).toFixed(1)}1</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `
  // console.log(productprice , deliveryprice,totalbeforetax,tax,ordertotal);
  document.querySelector('.js-payment-summary').innerHTML=paymenthtml;
}
orderpaymentsummary();