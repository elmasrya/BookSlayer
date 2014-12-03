(function () {


  App.Views.MyBook = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#myBookTemp').html()),

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
