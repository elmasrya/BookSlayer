(function () {


  App.Routers.AppRouter = Backbone.Router.extend({


    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      ''        : 'home',
      'myList'  : 'myList',
      'about'   : 'about',
      'contact' : 'contact'
    },

    home: function () {

      new App.Views.NavBar();
      new App.Views.SearchBook({collection: App.results});
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
