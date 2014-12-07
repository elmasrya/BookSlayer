(function () {

  App.Views.Profile = Parse.View.extend({


    tagName: 'ul',
    className: 'allBooks',

    events: {
    }, // end of events

    template                : _.template($('#profileTemp').html()),

    initialize              : function (options) {
      this.options = options;
      this.render();
      $("#middle").html(this.$el);

    }, // end of initialize

    render                  : function () {
      $("#middle").html(this.$el);
      var self = this;

      var myBook_query = new Parse.Query(App.Models.Book);
      myBook_query.equalTo('user', this.options.user);
      myBook_query.descending("updatedAt");
      myBook_query.find({
        success: function(books){
          _.each(books, function(b) {
            self.$el.append(self.template(b.toJSON()));
          });
        }
      });
    },

  }); // end of view


}()); // end of IIF
