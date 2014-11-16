
$('.search').on('click', function(){
      event.preventDefault();
      var inputVal=$('.searchBar').val();
      console.log(inputVal);


  var googleApi="https://www.googleapis.com/books/v1/volumes?q="+inputVal+"&callback=handleResponse";








  // Send item to server
  $.ajax({
    type: 'GET',
    url: googleApi


  });

});

    function handleResponse(response) {
      for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        // in production code, item.text should have the HTML entities escaped.

        if(item.volumeInfo.pageCount===undefined) {


        $('#content').append("<br>" + "<button class='choices'>" + "Book Title: " + item.volumeInfo.title + "<br>" + "Pages: Not Available " + "</button>" + "<br>" + "<br>");


        } else{
          console.log("giants");
        $('#content').append("<br>"+ "<button class='choices'>" + "Book Title: " + item.volumeInfo.title + "<br>" + "Pages: " + item.volumeInfo.pageCount + "</button>" + "<br>" + "<br>");


        }



      }//End of loop

        var g=item.volumeInfo.title;
        var b=item.volumeInfo.pageCount;
        $('.choices').on('click', function(){
        console.log('click');

        $('#mycontent').append("Title: " + g + "<br>", "Pages: " + b + "<br>");
        var exit=$('#mycontent').val();
        console.log(exit);

        });


    }/*end of handleResponse*/




  // Create Instance of Collection
  // App.books = new App.Collections.Books();
  //
  // // Fetch any server-side coffees
  // App.books.fetch().done( function () {
  //
  // App.router = new App.Routers.AppRouter();
  //
  // });
