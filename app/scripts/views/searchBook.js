(function () {


  App.Views.SearchBook = Backbone.View.extend({


    el                : '#middle',

    template          : _.template($('#searchBookTemp').html()),

    events: {

    }, // end of events


    initialize: function () {
      console.log("yes!");
      this.$el.html(this.template);

      this.render();


    },

    render: function () {

      new App.Views.NavBar();
    }



  });

}());
