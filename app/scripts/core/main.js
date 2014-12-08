Parse.initialize("MCSNBPaOJowTLp0LZqcG2hPRLKsPlTqHeKT3CK3P","JRsBK5g0aam1H89lxIcZIqRTSllbuiASaNIkz9G7");

(function() {

  App.books = new App.Collections.Books();

  App.user = Parse.User.current();

  new App.Views.NavBar({user: App.user});

  App.books.fetch().done(function () {
      App.router = new App.Routers.AppRouter();
      Parse.history.start();
  });

  App.handleResponse = function (response) {
    console.log("working");
    for (var i = 0; i < response.items.length; i++) {
      var item = response.items[i];
      // in production code, item.text should have the HTML entities escaped.

      if(item.volumeInfo.pageCount===undefined) {


      $('.searchResults').append("<br>" + "<button class='choices' id='"+ i + "'> + </button>" +
        "<span class='book' id='" + i +"'>" +"Book Title: " + item.volumeInfo.title + "<br>" + "Pages: Not Available " + "<br>" + "<br>"
        + "</span>");


      } else{

      $('.searchResults').append("<br>" + "<button class='choices' id='"+ i + "'> + </button>" +
        "<span class='book' id='" +  i +"'>" +"Book Title: " + item.volumeInfo.title + "<br></br>" + "<a href="+ item.volumeInfo.previewLink + ">Preview</a>" +"<img src="+ item.volumeInfo.imageLinks.thumbnail + "/>" +"<br>" + "Pages: " + item.volumeInfo.pageCount
       + "<br>" + "<br>" + "</span>");


      }




    }//End of loop


      $('.choices').on('click', function(){

        var elemID = this.id;
        console.log(elemID);

        var bookInfo = $('.book[id=' + elemID + ']').text();
        // var =item.volumeInfo.title;
        // var b=item.volumeInfo.pageCount;


      $('.addBookSec').append("<br>" + bookInfo + "<br>");
      var exit=$('.addBookSec').val();

      });

  }

}());
