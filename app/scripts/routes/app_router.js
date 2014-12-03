(function () {


  App.Routers.AppRouter = Parse.Router.extend({


    initialize: function () {
      // Light the Fire
    },

    routes: {
      ''        : 'home',
      'myList'  : 'myList',
      'about'   : 'about',
      'contact' : 'contact'
    },

    home: function () {

      new App.Views.NavBar();
      new App.Views.SearchBook();
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


    }

  });

}());
