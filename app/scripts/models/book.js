(function () {
  App.Models.Book = Parse.Object.extend({

    className: 'Book',

    idAttribute: 'objectId',

    defaults: {
      user: '',
      title: '',
      readingLevel:'',
      pageCount: '',
      duration:''
    },

    initialize : function () {

    }




  });

}());
