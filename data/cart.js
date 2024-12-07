import { products_details } from '../data/products.js';


export let cart=JSON.parse(localStorage.getItem('cart'));
let ordersummaryelem=document.querySelector('.js-order-summay');

if(!cart)
{

  //  ordersummaryelem.innerHTML='<h2>no items added<h2>';

  cart=[
    {
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1,
      deliveryid:'1'
    },
  ];  
}

export function cartitem_to_localstorage()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart(productId){
  let matchingitem;
    cart.forEach((item)=>{
      if(productId===item.productId)
      {
        matchingitem=item;
      } 
    });

    if(matchingitem)
    {
      matchingitem.quantity+=1;
    }
    else{
      cart.push({
        productId:productId,
        quantity:1,
        deliveryid:'1'
      })
    }
    cartitem_to_localstorage();
}


export function remove_cartItem(productId)
{
  let newcart=[];
  cart.forEach((cart_item)=>{
    if(productId!==cart_item.productId)
    {
      newcart.push(cart_item);
    }
  })
  cart = newcart;
  cartitem_to_localstorage();
}

export function updatedelivaryoption(deliveryId,cartproductId)
{
  let matching;
  cart.forEach((element)=>{
    if(cartproductId===element.productId)
    {
      matching=element;
    }
  })

  if(matching)
  {
    matching.deliveryid=deliveryId;
    cartitem_to_localstorage();
  }
  else{
    console.log('error in finding product id');
  }
}