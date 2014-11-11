(function () {

  App.Collections.Books = Backbone.Collection.extend({
    model: App.Models.Book,
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/drewdog'
  });

}());
