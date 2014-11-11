(function () {

  App.Views.AddBook = Backbone.View.extend({

    events: {
      'submit #add' : 'addBook'
    },

    initialize: function () {
      this.render();

      $('#myList').html(this.$el);
    },

    render: function () {
      this.$el.html($('#addTemp').html());
    },

    addCoffee: function (e) {
      e.preventDefault();

      var b = new App.Models.Book({
        title: $('#mycontent').val(),
      });

      App.books.add(b).save(null, {
        success: function () {
          App.router.navigate('', { trigger: true });
        }
      });

    }

  });

}());
