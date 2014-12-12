(function () {
  App.Models.Book = Parse.Object.extend({
    className: 'Book',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      readingLevel:0,
      pageCount: 0,
      user: '',
      duration:0,
      d: null,
      tOne: null,
      tTwo:null,
      status: ''
    },

    initialize : function () {

    }




  })

}());
