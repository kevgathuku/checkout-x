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

const formatCurrency = function(currency, price) {
  // In JS this is perfectly valid!
  price = price + '';
  return currency + price.toCurrency();
};

// Example of a Closure.
// Runs the function immediately the document loads
// Variables defined inside here are not visible outside the closure
(function() {

  let totalText = $('.shopping-cart-total > .main-color-text').text();
  let totalValue = parsePriceFromText(totalText);

  $("#cart").on("click", function() {
    $(".shopping-cart").fadeToggle("fast");
  });

  $(".card").on("click", "#add-to-cart", function(event) {
    // Extract the price of the clicked product from the data attributes
    let data = $(this).closest(".card").data();
    let price = data.price;

    // Add the price to the total
    let newTotal = formatCurrency('$', totalValue + price);

    // Update the price in the DOM
    $('.shopping-cart-total > .main-color-text').text(newTotal);
  });

})();
