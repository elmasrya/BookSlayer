(function () {

/*parse view*/
  App.Views.ProfileTools = Parse.View.extend({


    el                : '#tools',

    template          : _.template($('#toolsTemp').html()),

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
