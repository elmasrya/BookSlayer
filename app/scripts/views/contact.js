(function () {


  App.Views.Contact = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#contactTemp').html()),

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
