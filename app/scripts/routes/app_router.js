(function () {


  App.Routers.AppRouter = Backbone.Router.extend({


    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      '' : 'home',
      'myList' : 'myBList',

    },

    home: function () {

      new App.Views.NavBar();
      new App.Views.SearchBook({collection: App.results});
      new App.Views.Footer();


    },

    myBlist: function () {
      new App.Views.NavBar();

      new App.Views.MyBook();


    }

  });

}());
