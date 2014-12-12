(function () {

  App.Views.Profile = Parse.View.extend({


    tagName: 'ul',
    className: 'allBooks',

    events: {
    }, // end of events

    templateOne                : _.template($('#profileUpLeftTemp').html()),
    templateTwo                : _.template($('#profileLowLeftTemp').html()),
    templateThree              : _.template($('#profileRightTemp').html()),
    templateTools              : _.template($('#toolsTemp').html()),
    middleFixerTemplate        : _.template($('#threeTemps').html()),

    initialize              : function (options) {
      this.options = options;
      this.render();
      }, // end of initialize

    render                  : function () {
      $('#middle').html(this.middleFixerTemplate);
      $('#tools').html(this.templateTools);
      this.bookQuery();
      this.sideRead();
      this.sideScore();
    },

    sideScore    : function () {
      var self = this;
      $('#upperL').html(self.templateOne(App.user));
      },

    sideRead    : function () {
        var self = this;
        $('#lowerL').html(self.templateTwo(App.user));
      },

    bookQuery : function () {
      var self = this;
      var myBook_query = new Parse.Query(App.Models.Book);
      myBook_query.equalTo('user', this.options.user);
      myBook_query.descending("updatedAt");
      myBook_query.find({
        success: function(books){
          _.each(books, function(b) {
            $('#middleRight').append(self.templateThree(b.toJSON()));
          });
        }
      });
    }

  }); // end of view


}()); // end of IIF
