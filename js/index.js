String.prototype.toCurrency = function() {
  // Match a digit followed by 1 or more groups of 3 digits
  // Only capture a digit if the groups of 3 do not have a digit after them
  // i.e. up to the end of the string
  // Add a comma after the matched digit
  return parseFloat(this).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

String.prototype.fromCurrency = function() {
  // Remove all commas in the string
  return parseFloat(this.replace(/\,/g, ''));
};

const parsePriceFromText = function(text) {
  return text.split('$')[1].fromCurrency();
};

const formatCurrency = function(price) {
  // In JS this is perfectly valid!
  price = price + '';
  return '$' + price.toCurrency();
};

(function() {

  let totalText = $('.shopping-cart-total > .main-color-text').text();
  let totalValue = parsePriceFromText(totalText);

  $("#cart").on("click", function() {
    $(".shopping-cart").fadeToggle("fast");
  });

  $(".card").on("click", "#add-to-cart", function(event) {
    // Extract the price of the clicked product
    let priceText = $(this).siblings('.product-price').text();
    // Add the price to the total
    let itemPrice = parsePriceFromText(priceText);
    let newTotal = formatCurrency(totalValue + itemPrice);

    // Update the price in the DOM
     $('.shopping-cart-total > .main-color-text').text(newTotal);
  });

})();
