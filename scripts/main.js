window.App = {};
        App.Models = {};
        App.Collections = {};
        App.Views = {};
        App.Routers = {};

(function () {

  App.Views.Profile = Parse.View.extend({

    el                      : '#middle',

    events: {
      'click .searchLink' : 'search'
    }, // end of events

    template                : _.template($('#profileTemp').html()),

    initialize              : function () {

      this.render();
    }, // end of initialize

    render                  : function () {
      this.$el.html(this.template);

    },

    search                  : function () {
    App.router.navigate('search', { trigger: true });
    new App.Views.Search();
    }

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

(function () {


  App.Views.NavBar = Parse.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
        'click .myList'     : 'myList',
        'click .homeBtn'    : 'home',
        'click .aboutBtn'   : 'about',
        'click .contactBtn' : 'contact',
        'click .userAccount': 'account'
    }, // end of events


    initialize: function () {


      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    myList: function () {
      App.router.navigate('myList', { trigger: true });
      new App.Views.MyBook();


    },

    home      : function() {

    },

    about     : function () {
      App.router.navigate('about', { trigger: true });
      new App.Views.About();

    },

    contact   : function () {

    },

    account : function () {
      App.router.navigate('profile', { trigger: true });

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


    initialize: function () {


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
        success: function () {
          console.log('Login successful');
          App.router.navigate('profile', {trigger: true});
        },
        error: function (user, error) {
          console.log('wrong');
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
          $('#middle').empty();
          App.router.navigate('', { trigger: true });
        },
        error: function(user, error) {
          alert('Error');
          App.router.navigate('', { trigger: true });
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


  App.Views.NavBar = Parse.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
        'click .myList'     : 'myList',
        'click .homeBtn'    : 'home',
        'click .aboutBtn'   : 'about',
        'click .contactBtn' : 'contact',
        'click .userAccount': 'account'
    }, // end of events


    initialize: function () {


      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    myList: function () {
      App.router.navigate('myList', { trigger: true });
      new App.Views.MyBook();


    },

    home      : function() {

    },

    about     : function () {
      App.router.navigate('about', { trigger: true });
      new App.Views.About();

    },

    contact   : function () {

    },

    account : function () {
      App.router.navigate('profile', { trigger: true });

    }






  });

}());

(function () {


  App.Views.Search = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#searchBookTemp').html()),

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

(function () {


  App.Routers.AppRouter = Parse.Router.extend({


    initialize: function () {
    },

    routes: {
      ''        : 'home',
      'myList'  : 'myList',
      'about'   : 'about',
      'contact' : 'contact',
      'signup'  : 'signup',
      'login'   : 'login',
      'profile' : 'profile',
      'search'  : 'search'
    },

    home: function () {
      new App.Views.NavBar();
      new App.Views.Home();
      new App.Views.Footer();


    },

    myList: function () {
      new App.Views.NavBar();
      new App.Views.MyBook();
      new App.Views.Footer();
    },

    contact: function () {
      new App.Views.NavBar();
      new App.Views.Contact();
      new App.Views.Footer();
    },

    about: function () {
      new App.Views.NavBar();
      new App.Views.About();
      new App.Views.Footer();
    },

    signup: function () {
      new App.Views.NavBar();
      new App.Views.SignUp();
      new App.Views.Footer();
    },

    login: function () {
      new App.Views.NavBar();
      new App.Views.Login();
      new App.Views.Footer();
    },

    profile: function () {
      new App.Views.NavBar();
      new App.Views.Profile();
      new App.Views.Footer();

    },

    search: function () {
      new App.Views.NavBar();
      new App.Views.Search();
      new App.Views.Footer();

    }



  });

}());

Parse.initialize("MCSNBPaOJowTLp0LZqcG2hPRLKsPlTqHeKT3CK3P","JRsBK5g0aam1H89lxIcZIqRTSllbuiASaNIkz9G7");

(function() {

  App.router = new App.Routers.AppRouter();
  Parse.history.start();

}());

$('.searchBtn').on('click', function(){
      event.preventDefault();
      $('.searchResults').empty();
      var inputVal=$('.searchBar').val();
      console.log(inputVal);


  var googleApi="https://www.googleapis.com/books/v1/volumes?q="+inputVal+"&callback=handleResponse";








  // Send item to server
  $.ajax({
    type: 'GET',
    url: googleApi


  });

});

    function handleResponse(response) {
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


    }/*end of handleResponse*/
