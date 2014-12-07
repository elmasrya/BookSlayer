(function () {


  App.Routers.AppRouter = Parse.Router.extend({


    initialize: function () {
    },

    routes: {
      ''        : 'home',
      'about'   : 'about',
      'contact' : 'contact',
      'signup'  : 'signup',
      'login'   : 'login',
      'profile'      : 'profile',
      'search'  : 'search',
      'addBook' : 'addBook'
    },

    home: function () {
      new App.Views.NavBar();
      new App.Views.Home();
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

    addBook: function () {
      new App.Views.NavBar();
      new App.Views.AddBook();
      new App.Views.Footer();

    },
    profile: function () {
      new App.Views.NavBar();
      new App.Views.Profile({user: App.user});
      new App.Views.Footer();

    },


    search: function () {
      new App.Views.NavBar();
      new App.Views.Search();
      new App.Views.Footer();

    }


  });

}());
