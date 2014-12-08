(function () {

/*parse view*/
  App.Views.Test = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#testTemp').html()),

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
