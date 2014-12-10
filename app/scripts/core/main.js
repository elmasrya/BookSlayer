Parse.initialize("MCSNBPaOJowTLp0LZqcG2hPRLKsPlTqHeKT3CK3P","JRsBK5g0aam1H89lxIcZIqRTSllbuiASaNIkz9G7");

(function() {

  App.books = new App.Collections.Books();

  App.user = Parse.User.current();

  new App.Views.NavBar({user: App.user});

  App.books.fetch().done(function () {
      App.router = new App.Routers.AppRouter();
      Parse.history.start();
  });



}());
