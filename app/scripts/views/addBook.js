(function(){

  App.Views.AddBook = Parse.View.extend({

    el             : '#middle',

    tagName: 'ul',
    className: 'bookItem',


    template        : _.template($('#addBookTemp').html()),

    events: {
      'click .addBookBtn': 'addBook',

    },

    initialize   : function () {

      this.render();
    },

    render  : function () {
      this.$el.html(this.template);

    },

    addBook : function (e) {

      e.preventDefault();

      if($('.bookTitle').val() === ""){
        alert('Please create add book Title.');
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
          user: App.user,
          title: $('.bookTitle').val(),
          readingLevel: $('.readingLevel option:selected').val(),
          pageCount: $('.pageCount').val(),
          duration: $('.duration').val()
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
