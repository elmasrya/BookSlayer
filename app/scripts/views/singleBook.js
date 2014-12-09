(function () {

/*parse view*/
  App.Views.SingleBook = Parse.View.extend({

events: {
    'click .deleteBtn' : 'delete',
    'click .slayBtn'   : 'slay'

}, // end of events


    template          : _.template($('#singleTemp').html()),



    initialize: function (options) {
      this.options=options;
      this.render();
      $("#middle").html(this.$el);
    },

    render: function () {
      var self = this;

      $("#middle").empty();

      this.$el.empty();

      this.$el.html(this.template(this.options.book.toJSON()));

    },

    delete : function (e) {
       e.preventDefault();

      // Remove Coffee
      this.options.book.destroy();

      // Go home ET
      App.router.navigate('profile', {trigger: true});

    },

    slay : function () {

    }



  });

}());
