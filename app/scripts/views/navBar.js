(function () {


  App.Views.NavBar = Backbone.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

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
