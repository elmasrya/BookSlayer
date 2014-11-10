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




// (function () {
//
//   App.Views.AddBook = Backbone.View.extend({
//
//     events: {
//       'submit #addCoffee' : 'addCoffee'
//     },
//
//     initialize: function () {
//       this.render();
//
//       $('#coffeeList').html(this.$el);
//     },
//
//     render: function () {
//       this.$el.html($('#addTemp').html());
//     },
//
//     addCoffee: function (e) {
//       e.preventDefault();
//
//       var c = new App.Models.Coffee({
//         name: $('#coffee_name').val(),
//         brand: $('#coffee_brand').val()
//       });
//
//       App.coffees.add(c).save(null, {
//         success: function () {
//           App.router.navigate('', { trigger: true });
//         }
//       });
//
//     }
//
//   });
//
// }());



$('.search').on('click', function(){
      event.preventDefault();
      var inputVal=$('.whatever').val();
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


        $('#content').append("<br>" + "<button>" + "Book Title: " + item.volumeInfo.title + "<br>" + "Pages: None " + "</button>" + "<br>");


        } else{
          console.log("giants");
        $('#content').append("<br>"+ "<button>" + "Book Title: " + item.volumeInfo.title + "<br>" + "Pages: " + item.volumeInfo.pageCount + "</button>" + "<br>");


        }

      }


    }/*end of handleResponse*/
