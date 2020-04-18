//debugger;

//
$(document).ready(function() {
  /* Set rates + misc */
  const taxRate = 0.05;
  const shippingRate = 15.00; 
  const fadeTime = 300;


  /* Assign actions */
  $('.productQuantity input').change( function() {
    updateQuantity(this);
  });

  $('.product-removal button').click( function() {
    removeItem(this);
  });


  /* Recalculate cart */
  function recalculateCart() {
    let subtotal = 0;
    
    /* Sum up row totals */
    $('.product').each(function () {
      subtotal += parseFloat($(this).children('.product-line-price').text());
    });
    
    /* Calculate totals */
    let tax = subtotal * taxRate;
    let shipping = (subtotal > 0 ? shippingRate : 0);
    let total = subtotal + tax + shipping;
    
    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
      $('#cartSubtotal').html(subtotal.toFixed(2));
      $('#cartTax').html(tax.toFixed(2));
      $('#cartShipping').html(shipping.toFixed(2));
      $('#cartTotal').html(total.toFixed(2));
      if(total == 0){
        $('.checkout').fadeOut(fadeTime);
      }else{
        $('.checkout').fadeIn(fadeTime);
      }
      $('.totals-value').fadeIn(fadeTime);
    });
  }


  /* Update quantity */
  function updateQuantity(quantityInput) {
    /* Calculate line price */
    let productRow = $(quantityInput).parent().parent();
    let price = parseFloat(productRow.children('.product-price').text());
    let quantity = $(quantityInput).val();
    let linePrice = price * quantity;
    
    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
      $(this).fadeOut(fadeTime, function() {
        $(this).text(linePrice.toFixed(2));
        recalculateCart();
        $(this).fadeIn(fadeTime);
      });
      //$(this).fadeIn(fadeTime);
    }); 
  }


  /* Remove item from cart */
  function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    let productRow = $(removeButton).parent().parent();
    productRow.remove();
    productRow.slideUp(fadeTime, function() {
      //productRow.remove();
      recalculateCart();
    });
  }
});

