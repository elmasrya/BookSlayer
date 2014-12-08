(function(){

  App.Views.AddBook = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',


    template        : _.template($('#addBookTemp').html()),

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

      if($('.bookTitle').val() === ""){
        alert('Please add a book title.');
      }
      else if($('.readingLevel option:selected').val() === ""){
        alert("Please select a reading level");
      }
      else if($('.pageCount').val() === ""){
        alert("please put in page count");
      }
      else if($('.duration').val() === ""){
        alert("please put in how many days");
      }
      else{

        var b = new App.Models.Book({
          title: $('.bookTitle').val(),
          readingLevel: $('.readingLevel option:selected').val(),
          pageCount: $('.pageCount').val(),
          duration: $('.duration').val(),
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
