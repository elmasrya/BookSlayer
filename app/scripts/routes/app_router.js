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
