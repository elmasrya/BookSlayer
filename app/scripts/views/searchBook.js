(function () {


  App.Views.Search = Parse.View.extend({


    tagName: 'ul',
    className: 'allSearch',

    template          : _.template($('#searchBookTemp').html()),

    events: {
        'click .searchBtn' : 'searchBook'

    }, // end of events


    initialize: function () {

      this.render();
      $('#middle').html(this.$el);


    },

    render: function () {
      $("#middle").empty();

      this.$el.html(this.template());

    },

    searchBook : function (e) {

      e.preventDefault();
      $('.searchResults').empty();
      var inputVal=$('.searchBar').val();
      console.log(inputVal);
      $('.searchHeading').empty();
      $('.searchHeading').append("Your Search Results:");
      var googleApi="https://www.googleapis.com/books/v1/volumes?q="+inputVal+"&callback=App.handleResponse";
      $.ajax({
        type: 'GET',
        url: googleApi
      });

    App.handleResponse = function (response) {
      console.log("working");
      for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        // in production code, item.text should have the HTML entities escaped.

      $('.searchResults').append
          ("<div class='resultsFrame'>"+ "<button class='choices' id='"+ i + "'> + </button>"
           + "<span class='googleBookTitle truncate' id='" +  i +"'>" + item.volumeInfo.title +"</span>"
           + "<center>" + "<img class='searchPic' src="+ item.volumeInfo.imageLinks.thumbnail + "/>"+ "</center>"
           +"<div class='preview'>" + "<a class='previewlink' href="+ item.volumeInfo.previewLink + ">Preview Book</a>" + "</div>"
           + "<span class='googlePageCountSearch' id='" +  i +"'>" + item.volumeInfo.pageCount + "</span>"+"</div>");



      }//End of loop


        $('.choices').on('click', function(){

          var elemID = this.id;
          console.log(elemID);

          var bookTitleSearch = $('.googleBookTitle[id=' + elemID + ']').text();
          var bookPageSearch = $('.googlePageCountSearch[id=' + elemID + ']').text();
          console.log(bookTitleSearch);
          /*If you dont instantiate elements may repaeat or pile up based up user*/

          new App.Views.AddBook();
          App.router.navigate('addBook', { trigger: true });
          $('.bookTitleLabel').remove();
          $('.bookTitle').remove();
          $('.question1').remove();
          $('.pageCount').remove();
          $('.questionLevel').remove();
          $('.readingLevel').remove();
          $('.question2').remove();
          $('.duration').remove();
          $('.unitDays').remove();
          $('.unitMin').remove();
          $('.unit').remove();

            $('.addBookFrame').append
            ("<span class='bookTitleLabel'>Book Title: " + "</span>"
             + "<input class='bookTitle' type='text' value='"+ bookTitleSearch + "'>"
             + "<span class='question1'>How many pages are in the book? " + "</span>"
             + "<input class='pageCount' type='number' value='"+ bookPageSearch + "'>"  + "<span class='unit'>" + " pages" + "</span>"
             + "<span class='questionLevel'>Reading Rate: " + "</span>"
             + "<input class='readingLevel' type='number' placeholder='Number of words'/>" + "<span class='unitMin'>" + " per minute" + "</span>"
             + "<span class='question2'>How many days do you want this book finished by? " + "</span>"
             + "<input class='duration' type='number' placeholder='How many days?' />" + "<span class='unitDays'>" + " days" + "</span>");

        });

    }/*End of handle response*/



  }/*end of search function*/




  });

}());
