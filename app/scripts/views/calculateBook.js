(function () {

/*parse view*/
  App.Views.CalculateBook = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#calculateTemp').html()),

    events: {


    }, // end of events


    initialize: function () {


      this.render();

    },

    render: function () {

      this.$el.html(this.template);

    },



  });

}());
