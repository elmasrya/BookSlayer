(function () {


  App.Views.Search = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#searchBookTemp').html()),

    events: {
        'click .searchBtn' : 'searchBook'

    }, // end of events


    initialize: function () {

      this.render();



    },

    render: function () {

      this.$el.html(this.template);

    },

    searchBook : function (e) {

      e.preventDefault();
      $('.searchResults').empty();
      var inputVal=$('.searchBar').val();
      console.log(inputVal);

      var googleApi="https://www.googleapis.com/books/v1/volumes?q="+inputVal+"&callback=handleResponse";
      $.ajax({
        type: 'GET',
        url: googleApi
      });

      function handleResponse(response) {

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


    }




  });

}());
