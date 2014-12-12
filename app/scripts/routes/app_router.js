(function () {


  App.Routers.AppRouter = Parse.Router.extend({


    initialize: function () {
    },

    routes: {
      ''                  : 'home',
      'about'             : 'about',
      'signup'            : 'signup',
      'login'             : 'login',
      'profile'           : 'profile',
      'search'            : 'search',
      'addBook'           : 'addBook',
      'test'              : 'test',
      'single/:objectId'  : 'single',
      'edit/:objectId'    : 'editBook',
      'addSearch'         : 'addSearch'
    },

    home: function () {
      new App.Views.Home();
      new App.Views.Footer();

    },

    about: function () {
      new App.Views.About();
      new App.Views.Footer();
    },

    signup: function () {
      new App.Views.SignUp();
      new App.Views.Footer();
    },

    login: function () {
      new App.Views.Login({user: App.user});
      new App.Views.Footer();
    },

    addBook: function () {
      new App.Views.AddBook({user: App.user});
      new App.Views.Footer();
    },

    profile: function () {
      if(App.user!==null) {
        console.log('we got auser and stuff');
        new App.Views.Profile({user: App.user});
        console.log('we rendered the profile');
        new App.Views.Footer();
        console.log('and the footer we rock');
      }else{
        new App.Views.Error();
      }

    },

    search: function () {
      if(App.user!==null) {
        new App.Views.Search();
        new App.Views.Footer();
      }else{
        new App.Views.Error();
      }
    },

    test: function () {
      if(App.user!==null) {
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
        new App.Views.EditBook({objectId: objectId, book: updateBook, user: App.user});
        new App.Views.Footer();
      }else{
        new App.Views.Error();
      }
    },

    addSearch : function() {
      new App.Views.AddSearch();
      new App.Views.Footer();
    },



  });

}());
