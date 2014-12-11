(function () {

/*parse view*/
  App.Views.Error = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#errorTemp').html()),

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
