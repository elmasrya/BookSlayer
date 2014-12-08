(function () {

/*parse view*/
  App.Views.SingleBook = Parse.View.extend({

events: {


}, // end of events


    template          : _.template($('#singleTemp').html()),



    initialize: function (options) {
      this.options=options;
      this.render();
      $("#middle").html(this.$el);
    },

    render: function () {
      var self = this;


      this.$el.html(this.template(this.options.book.toJSON()));

    }



  });

}());
