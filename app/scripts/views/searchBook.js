(function () {


  App.Views.SearchBook = Backbone.View.extend({


    el                : '#middle',

    template          : _.template($('#searchBookTemp').html()),

    events: {

    }, // end of events


    initialize: function () {

      this.render();


    },

    render: function () {

      this.$el.html(this.template);

    }



  });

}());
