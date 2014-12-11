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
      'single/:objectId'  : 'single',
      'edit/:objectId'    : 'editBook',
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
      if(App.user!==null) {
      new App.Views.Profile({user: App.user});
      new App.Views.Footer();
      }else{
      new App.Views.Error();
      }

    },

    search: function () {
      if(App.user!==null) {
      $('#tools').empty();
      new App.Views.Search();
      new App.Views.Footer();
      }else{
      new App.Views.Error();
      }
    },

    test: function () {
      if(App.user!==null) {
      $('#tools').empty();
      new App.Views.Test();
      new App.Views.Footer();
      }else{
      new App.Views.Error();
      }
    },

    single: function (objectId) {
      if(App.user!==null) {
      var singleBook = App.books.get(objectId);
      new App.Views.SingleBook({book: singleBook, collection: App.books, user: App.user});
      new App.Views.Footer();
      }else{
      new App.Views.Error();
      }
    },

    editBook: function(objectId){
      if(App.user!==null) {
      var updateBook= App.books.get(objectId);
      new App.Views.EditBook({objectId: objectId, book: updateBook});
      new App.Views.Footer();
      }else{
      new App.Views.Error();
      }
    }



  });

}());
