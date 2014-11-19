(function () {


  App.Views.MyBook = Backbone.View.extend({


    el                : '#middle',

    template          : _.template($('#myBookTemp').html()),

    events: {
    }, // end of events


    initialize: function () {


      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    }



  });

}());

(function () {


  App.Views.NavBar = Backbone.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
        'click .myList' : 'myList'
    }, // end of events


    initialize: function () {


      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    myList: function () {
      App.router.navigate('myList', { trigger: true });
      new App.Views.MyBook();


    }



  });

}());

(function () {


  App.Views.SearchBook = Backbone.View.extend({


    el                : '#middle',

    template          : _.template($('#searchBookTemp').html()),

    events: {

      'click .addBook' : 'addBook'

    }, // end of events


    initialize: function (options) {
      this.options = options;

      this.render();
      // this.collection.off();
      // this.collection.on('sync', this.render, this);


    },

    render: function () {

      this.$el.html(this.template);

    },


    addBook: function () {

        }

  });

}());


(function () {

  App.Collections.Results = Backbone.Collection.extend({
    model: App.Models.Book,
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/bookslayer'
  });

}());

(function () {

  App.Models.Favorites = Backbone.Model.extend({

    idAttribute: '_id',

    defaults: {
      Title: '',
      Page: '',
    },

    initialize: function () {

    },

    render    : function () {

    }

  });

}());

(function () {


  App.Routers.AppRouter = Backbone.Router.extend({


    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      '' : 'home',
      'myList' : 'myBList',

    },

    home: function () {

      new App.Views.NavBar();
      new App.Views.SearchBook({collection: App.results});


    },

    myBlist: function () {
      new App.Views.NavBar();

      new App.Views.MyBook();


    }

  });

}());

App.router = new App.Routers.AppRouter();
App.results = new App.Collections.Results();

// App.results.fetch().done( function () {
//
//     App.router = new App.Routers.AppRouter();
//
//   });






$('.searchBtn').on('click', function(){
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


        $('.searchResults').append("<br>" + "<button class='choices' id='"+ i + "'> + </button>" +
          "<span class='book' id='" + i +"'>" +"Book Title: " + item.volumeInfo.title + "<br>" + "Pages: Not Available " + "<br>" + "<br>"
          + "</span>");


        } else{

        $('.searchResults').append("<br>" + "<button class='choices' id='"+ i + "'> + </button>" +
          "<span class='book' id='" +  i +"'>" +"Book Title: " + item.volumeInfo.title +"<br>" + "Pages: " + item.volumeInfo.pageCount
         + "<br>" + "<br>" + "</span>");


        }

        // var c = new App.Models.Book({
        // Title: item.volumeInfo.title,
        // Page: item.volumeInfo.pageCount
        // });

        // App.results.add(c).save(null, {
        //       success: function () {
        //         // App.router.navigate('', { trigger: true });
        //       }
        //     });



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


    }/*end of handleResponse*/
