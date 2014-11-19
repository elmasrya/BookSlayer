(function () {


  App.Views.SearchBook = Backbone.View.extend({


    el                : '#middle',

    template          : _.template($('#searchBookTemp').html()),

    events: {

      'click .addBook' : 'addBook'

    }, // end of events


    initialize: function (options) {
      this.options = options;

      this.render();
      // this.collection.off();
      // this.collection.on('sync', this.render, this);


    },

    render: function () {

      this.$el.html(this.template);

    },


    addBook: function () {

        }

  });

}());
