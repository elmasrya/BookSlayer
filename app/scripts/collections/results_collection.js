(function () {

  App.Collections.Results = Backbone.Collection.extend({
    model: App.Models.Book,
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/bookslayer'
  });

}());
