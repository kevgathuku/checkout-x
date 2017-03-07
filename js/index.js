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

// Example of a Closure.
// Runs the function immediately the document loads
// Variables defined inside here are not visible outside the closure
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
      this.$cartIcon = this.$element.find('#cart');
      this.$shoppingCart = this.$element.find('.shopping-cart');

      this.currencyString = '$';

      this.enableCartToggle();
      this.enableAddToCart();
    },

    // Event handler functions

    enableAddToCart: function() {
      var $self = this;
      // Get the initial total value
      let initialTotal = this._extractPrice(this.$total);

      this.$shoppingItem.on('click', '#add-to-cart', function() {
        // Extract the price of the clicked product from the data attributes
        let data = $(this).closest('.card').data();
        let newTotal = parseFloat(data.price) + initialTotal;

        // Add the price to the total
        let totalText = $self._formatCurrency($self.currencyString, newTotal);

        // Update the price in the DOM
        $('#shopping-total').text(totalText);
      });
    },

    enableCartToggle: function() {
      var $self = this;
      this.$cartIcon.on('click', function() {
        $self.$shoppingCart.fadeToggle('fast');
      });
    },

    // Private methods
    // By convention, these are underscored

    _extractPrice: function(element) {
			var $self = this;
			var text = element.text();
			var price = text.replace($self.currencyString, '').replace(' ', '');
			return price.fromCurrency();
		},

    _formatCurrency: function(currency, price) {
      // Convert the integer to a string
      // In JS this is perfectly valid!
      price = price + '';
      return currency + price.toCurrency();
    },
  };

  $(function() {
    var shop = new $.Shop('#shopping-cart-app'); // object's instance
    console.log(shop.$cartIcon);
  });

})(jQuery);
