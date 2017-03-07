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

  $('.card').on('click', '#add-to-cart', function(event) {
    // Extract the price of the clicked product from the data attributes
    let data = $(this).closest('.card').data();
    let price = data.price;

    // Add the price to the total
    let newTotal = formatCurrency('$', totalValue + price);

    // Update the price in the DOM
    $('.shopping-cart-total > .main-color-text').text(newTotal);
  });

})();

(function($) {
  $.Shop = function(element) {
    this.$element = $(element); // top-level element
    this.init();
  };

  $.Shop.prototype = {
    init: function() {
      // initializes properties and methods
      this.$total = this.$element.find('#shopping-total');
      this.$shoppingItem = this.$element.find('.card');
      this.$addToCart = this.$shoppingItem.find('#add-to-cart');
      this.$cartIcon = this.$element.find('#cart');
      this.$shoppingCart = this.$element.find('.shopping-cart');

      this.currencyString = '$';

      this.enableCartToggle();
    },

    addToCart: function() {

    },

    enableCartToggle: function() {
      var $self = this;
      this.$cartIcon.on('click', function() {
        $self.$shoppingCart.fadeToggle('fast');
      });
    }
  };

  $(function() {
    var shop = new $.Shop('#shopping-cart-app'); // object's instance
    console.log(shop.$cartIcon);
  });

})(jQuery);
