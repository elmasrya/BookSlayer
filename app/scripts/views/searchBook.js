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
          console.log("click");
          var elemID = this.id;
          console.log(elemID);

          var bookTitleSearch = $('.googleBookTitle[id=' + elemID + ']').text();
          var bookPageSearch = $('.googlePageCountSearch[id=' + elemID + ']').text();
          console.log(bookTitleSearch);
          /*If you dont instantiate elements may repaeat or pile up based up user*/

          new App.Views.AddSearch();
          App.router.navigate('addSearch', { trigger: true });

          $('.addSearchFrame').append
          ("<span class='bTitleLabel'>Book Title: " + "</span>"
          + "<input class='bTitle' type='text' value='"+ bookTitleSearch + "'>"
          + "<span class='q1'>How many pages are in the book? " + "</span>"
          + "<input class='pCount' type='number' value='"+ bookPageSearch + "'>"  + "<span class='unit'>" + " pages" + "</span>"
          + "<span class='qLevel'>Reading Rate: " + "</span>"
          + "<input class='rLevel' type='number' value='" + App.user.attributes.wmp +"'/>" + "<span class='unitMin'>" + " per minute" + "</span>"
          + "<span class='q2'>How many days do you want this book finished by? " + "</span>"
          + "<input class='dur' type='number' placeholder='How many days?' />" + "<span class='unitDays'>" + " days" + "</span>");

        });

    }/*End of handle response*/



  }/*end of search function*/




  });



}());
