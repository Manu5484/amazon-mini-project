const cart={
  cartItem: undefined,

   getfromlocalstorage()
  {
     this.cartItem=JSON.parse(localStorage.getItem('cart-oop'));
    if(!this.cartItem)
    {
      this.cartItem=[
        {
          productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity:1,
          deliveryid:'1'
        },
      ];  
    }
  },

  cartitem_to_localstorage()
  {
    localStorage.setItem('cart-oop',JSON.stringify(this.cartItem));
  },

  addtocart(productId){
    let matchingitem;
      this.cartItem.forEach((item)=>{
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
        this.cartItem.push({
          productId:productId,
          quantity:1,
          deliveryid:'1'
        })
      }
  },

  remove_cartItem(productId)
  {
    let newcart=[];
    this.cartItem.forEach((cart_item)=>{
      if(productId!==cart_item.productId)
      {
        newcart.push(cart_item);
      }
    })
    this.cartItem = newcart;
    this.cartitem_to_localstorage();
  },

  updatedelivaryoption(deliveryId,cartproductId)
  {
    let matching;
    this.cartItem.forEach((element)=>{
      if(cartproductId===element.productId)
      {
        matching=element;
      }
    })
  
    if(matching)
    {
      matching.deliveryid=deliveryId;
      this.cartitem_to_localstorage();
    }
    else{
      console.log('error in finding product id');
    }
  }

};

cart.getfromlocalstorage();

console.log(cart);