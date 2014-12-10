(function(){

  App.Views.AddFromSearch = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',


    template        : _.template($('#addSearchTemp').html()),

    events: {
      'click .addBookBtn': 'addBook',

    },

    initialize   : function () {
      this.render();
      $("#middle").html(this.$el);

    },

    render  : function () {
      $("#middle").empty();

      this.$el.html(this.template());

    },

    addBook : function (e) {

      e.preventDefault();

      if($('.searchTitle').val() === ""){
        alert('Please add a book title.');
      }
      else if($('.readingLevelSearch').val() === ""){
        alert("Please put in a number for words per minute");
      }
      else if($('.pageCountSearch').val() === ""){
        alert("please put in a number for pages");
      }
      else if($('.durationSearch').val() === ""){
        alert("please put in a number for days");
      }
      else{

        var b = new App.Models.Book({
          title: $('.searchTitle').val(),
          readingLevel: $('.readingLevelSearch').val(),
          pageCount: $('.pageCountSearch').val(),
          duration: $('.durationSearch').val(),
          user: App.user,
        });

        // Set Access Control List
        var bookACL = new Parse.ACL(App.user);
        bookACL.setPublicReadAccess(true);
        b.setACL(bookACL);

        b.save(null, {
          success: function () {
            App.books.add(b);
            App.router.navigate('profile', { trigger: true });
          }
        });

      }

    }/*end of add book*/

  });

}());
