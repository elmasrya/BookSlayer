(function () {
  App.Models.Book = Parse.Object.extend({
    className: 'Book',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      readingLevel:'',
      pageCount: '',
      user: '',
      duration:''
    },

    initialize : function () {

    }




  })

}());

(function () {
  App.Collections.Books = Parse.Collection.extend({

    model: App.Models.Book

  });

}());

(function () {


  App.Routers.AppRouter = Parse.Router.extend({


    initialize: function () {
    },

    routes: {
      ''                  : 'home',
      'about'             : 'about',
      'contact'           : 'contact',
      'signup'            : 'signup',
      'login'             : 'login',
      'profile'           : 'profile',
      'search'            : 'search',
      'addBook'           : 'addBook',
      'test'              : 'test',
      'single/:objectId'   : 'single'
    },

    home: function () {
      $('#tools').empty();
      new App.Views.Home();
      new App.Views.Footer();
      },

    contact: function () {
      $('#tools').empty();
      new App.Views.Contact();
      new App.Views.Footer();
      },

    about: function () {
      $('#tools').empty();
      new App.Views.About();
      new App.Views.Footer();
      },

    signup: function () {
      $('#tools').empty();
      new App.Views.SignUp();
      new App.Views.Footer();
      },

    login: function () {
      $('#tools').empty();
      new App.Views.Login({user: App.user});
      new App.Views.Footer();
      },

    addBook: function () {
      $('#tools').empty();
      new App.Views.AddBook();
      new App.Views.Footer();
      },

    profile: function () {
      new App.Views.Profile({user: App.user});
      new App.Views.Footer();

    },

    search: function () {
      $('#tools').empty();
      new App.Views.Search();
      new App.Views.Footer();
    },

    test: function () {
      $('#tools').empty();
      new App.Views.Test();
      new App.Views.Footer();
    },

    single: function (objectId) {
      var singleBook = App.books.get(objectId);
      new App.Views.SingleBook({book: singleBook, collection: App.books, user: App.user});
      new App.Views.Footer();
    }



  });

}());

(function () {


  App.Views.NavBar = Parse.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
      'click .logout' : 'logout'
    }, // end of events


    initialize: function (options) {

      this.options=options;
      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },


    logout: function(e){

      var current = this.options;
      Parse.User.logOut();
      App.user=null;
      App.router.navigate('', { trigger: true });
      new App.Views.Home();
      location.reload();
    }





  });

}());

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

      $("#middle").empty();

      this.$el.empty();

      this.$el.html(this.template(this.options.book.toJSON()));

    }



  });

}());

(function () {

/*parse view*/
  App.Views.Test = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#testTemp').html()),

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

(function () {

/*parse view*/
  App.Views.ProfileTools = Parse.View.extend({


    el                : '#tools',

    template          : _.template($('#toolsTemp').html()),

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
      $('#middle').html(this.$el);



    }, // end of initialize

    render                  : function () {
      $('#middle').html(this.$el);
      new App.Views.ProfileTools();

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

(function () {

/*parse view*/
  App.Views.About = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#aboutTemp').html()),

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

(function () {


  App.Views.NavBar = Parse.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
      'click .logout' : 'logout'
    }, // end of events


    initialize: function (options) {

      this.options=options;
      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },


    logout: function(e){

      var current = this.options;
      Parse.User.logOut();
      App.user=null;
      App.router.navigate('', { trigger: true });
      new App.Views.Home();
      location.reload();
    }





  });

}());

(function () {


  App.Views.Login = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#loginTemp').html()),

    events: {
      'click .loginBtn' : 'goToAccount'
    }, // end of events


    initialize: function (options) {
      this.options=options;


      this.render();


    },

    render: function () {
      this.$el.html(this.template);
    },

    goToAccount : function () {
      // Log User into account

      var username = $('.usernameVal').val();
      var password = $('.passwordVal').val();

      Parse.User.logIn(username, password, {
        success: function (user) {
          App.user=user;
          location.reload();
          console.log('Login successful');
            App.router.navigate('', {trigger: true});

        },
        error: function (user, error) {
          location.reload();
          alert('Invalid user login');
        }
      }); // end of logIn
    } // end of go to account

  });


}());

(function () {


  App.Views.SignUp = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#signUpTemp').html()),

    events: {
      'click .signUpBtn' : 'creatingProfile'
    }, // end of events


    initialize: function () {
      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    creatingProfile: function(e) {
      e.preventDefault();
      // New User Creation
      // Send New User to Server
      var user = new Parse.User({
        username: $('.createUsernameVal').val(),
        password: $('.createPasswordVal').val(),
        email: $('.emailVal').val()
      });
      user.signUp(null, {
        success: function(user) {
          console.log('Account created');
          new App.Views.Login({user: App.user});

        },
        error: function(user, error) {
          alert('Error');
          new App.Views.Home();
        }

      })

    }



  });

}());

(function () {


  App.Views.Home = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#homeTemp').html()),

    events: {
        'click .signUpLink' : 'signUp',
        'click .loginLink'  : 'login'
    }, // end of events


    initialize: function () {

      
      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    signUp              : function () {
      App.router.navigate('signUp', { trigger: true });
      new App.Views.SignUp();


    },

    login     : function () {
      App.router.navigate('login', { trigger: true });
      new App.Views.Login();

    }



  });

}());

(function () {


  App.Views.Footer = Parse.View.extend({


    el                : '#bottom',

    template          : _.template($('#footerTemp').html()),

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

Parse.initialize("MCSNBPaOJowTLp0LZqcG2hPRLKsPlTqHeKT3CK3P","JRsBK5g0aam1H89lxIcZIqRTSllbuiASaNIkz9G7");

(function() {

  App.books = new App.Collections.Books();

  App.user = Parse.User.current();

  new App.Views.NavBar({user: App.user});

  App.books.fetch().done(function () {
      App.router = new App.Routers.AppRouter();
      Parse.history.start();
  });

  App.handleResponse = function (response) {
    console.log("working");
    for (var i = 0; i < response.items.length; i++) {
      var item = response.items[i];
      // in production code, item.text should have the HTML entities escaped.

      if(item.volumeInfo.pageCount===undefined) {


      $('.searchResults').append("<br>" + "<button class='choices' id='"+ i + "'> + </button>" +
        "<span class='book' id='" + i +"'>" +"Book Title: " + item.volumeInfo.title + "<br>" + "Pages: Not Available " + "<br>" + "<br>"
        + "</span>");


      } else{

      $('.searchResults').append("<br>" + "<button class='choices' id='"+ i + "'> + </button>" +
        "<span class='book' id='" +  i +"'>" +"Book Title: " + item.volumeInfo.title + "<br></br>" + "<a href="+ item.volumeInfo.previewLink + ">Preview</a>" +"<img src="+ item.volumeInfo.imageLinks.thumbnail + "/>" +"<br>" + "Pages: " + item.volumeInfo.pageCount
       + "<br>" + "<br>" + "</span>");


      }




    }//End of loop


      $('.choices').on('click', function(){

        var elemID = this.id;
        console.log(elemID);

        var bookInfo = $('.book[id=' + elemID + ']').text();
        // var =item.volumeInfo.title;
        // var b=item.volumeInfo.pageCount;


      $('.addBookSec').append("<br>" + bookInfo + "<br>");
      var exit=$('.addBookSec').val();

      });

  }

}());

(function () {


  App.Views.Search = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#searchBookTemp').html()),

    events: {
        'click .searchBtn' : 'searchBook'

    }, // end of events


    initialize: function () {

      this.render();



    },

    render: function () {

      this.$el.html(this.template);

    },

    searchBook : function (e) {

      e.preventDefault();
      $('.searchResults').empty();
      var inputVal=$('.searchBar').val();
      console.log(inputVal);

      var googleApi="https://www.googleapis.com/books/v1/volumes?q="+inputVal+"&callback=App.handleResponse";
      $.ajax({
        type: 'GET',
        url: googleApi
      });



    },

    delete : function () {

    },




  });

}());
