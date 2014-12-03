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
      'login'   : 'login'
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
    }



  });

}());
