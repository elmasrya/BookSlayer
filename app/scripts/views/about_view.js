(function () {

/*parse view*/
  App.Views.About = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#aboutTemp').html()),

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
