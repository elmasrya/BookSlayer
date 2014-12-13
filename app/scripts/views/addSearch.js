(function(){

  App.Views.AddSearch = Parse.View.extend({



    tagName: 'form',
    className: 'Search',


    template        : _.template($('#addSearchTemp').html()),

    events: {
      'click .addSearchBtn': 'addSearch',

    },

    initialize   : function () {
      this.render();
      $("#middle").html(this.$el);

    },

    render  : function () {
      $("#middle").empty();

      this.$el.html(this.template);

    },

    addSearch : function (e) {

      e.preventDefault();

      if($('.bTitle').val() === ""){
        alert('Please add a book title.');
      }
      else if($('.rLevel').val() === ""){
        alert("Please put in a number for words per minute");
      }
      else if($('.pCount').val() === ""){
        alert("please put in a number for pages");
      }
      else if($('.dur').val() === ""){
        alert("please put in a number for days");
      }
      else{

        var b = new App.Models.Book({
          title: $('.bTitle').val(),
          readingLevel: $('.rLevel').val(),
          pageCount: $('.pCount').val(),
          duration: $('.dur').val(),
          user: App.user,
        });

        // Set Access Control List
        var bookACL = new Parse.ACL(App.user);
        bookACL.setPublicReadAccess(true);
        b.setACL(bookACL);

        b.save(null, {
          success: function () {
            App.books.add(b);
            new App.Views.Profile({user: App.user});
            App.router.navigate('profile', { trigger: true });
            location.reload();
            
          }
        });

      }

    }/*end of add book*/

  });

}());
