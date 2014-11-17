(function () {


  App.Routers.AppRouter = Backbone.Router.extend({


    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      '' : 'home',

    },

    home: function () {
      // new App.Views.SearchBook();

    }

  });

}());
