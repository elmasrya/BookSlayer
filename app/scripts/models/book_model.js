(function () {

  App.Models.Book = Backbone.Model.extend({

    idAttribute: '_id',

    defaults: {
      Title: '',
      Page: '',
    },

    initialize: function () {
      // var t = this.get('');
      //console.log(t + " has been added");
    }

  });

}());
