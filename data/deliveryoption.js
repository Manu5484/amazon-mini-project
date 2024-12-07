import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'


export let deliveryoption=[
  {
    deliveryid:'1',
    date:7,
    pricecents:0
  },
  {
    deliveryid:'2',
    date:3,
    pricecents:499
  },
  {
    deliveryid:'3',
    date:1,
    pricecents:699
  }
];


export function deliveryoptions(matching_product,cart_item)
{
  let deliveryoptionhtml='';
  deliveryoption.forEach((deliveryoption)=>{
    let deliverydate=dayjs().add(`${deliveryoption.date}`,'days');
    let formateddate=deliverydate.format('dddd, MMMM D');
    let cost=(deliveryoption.pricecents>0)?`${deliveryoption.pricecents/100} -`:'FREE -';
    deliveryoptionhtml+=
    `
      <div class="delivery-option js_delivary_option"
        data-delivery-id='${deliveryoption.deliveryid}'
        data-cartproduct-id='${matching_product.id}'>
        <input type="radio" 
          class="delivery-option-input" ${(cart_item.deliveryid===deliveryoption.deliveryid)?'checked':''}
          name="${matching_product.id}">
        <div>
          <div class="delivery-option-date">
            ${formateddate}
          </div>
          <div class="delivery-option-price">
            ${cost} Shipping
          </div>
        </div>
      </div>`
  });

  return deliveryoptionhtml;
}