(function () {
  App.Models.Book = Parse.Object.extend({
    className: 'Book',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      readingLevel:'',
      pageCount: '',
      user: '',
      duration:''
    },

    initialize : function () {

    }




  })

}());
