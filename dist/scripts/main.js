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

(function () {

  App.Collections.Books = Backbone.Collection.extend({
    model: App.Models.Book,
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/drewdog'
  });

}());

(function () {

  App.Views.AddBook = Backbone.View.extend({

    events: {
      'submit #add' : 'addBook'
    },

    initialize: function () {
      this.render();

      $('#myList').html(this.$el);
    },

    render: function () {
      this.$el.html($('#addTemp').html());
    },

    addCoffee: function (e) {
      e.preventDefault();

      var b = new App.Models.Book({
        title: $('#mycontent').val(),
      });

      App.books.add(b).save(null, {
        success: function () {
          App.router.navigate('', { trigger: true });
        }
      });

    }

  });

}());

(function () {

  App.Views.Book_List = Backbone.View.extend({

    // tagName: 'ul',
    // className: 'allCoffees',
    //
    // events: {},
    //
    // template: _.template($('#listTemp').html()),
    //
    // initialize: function (options) {
    //
    //   this.options = options;
    //
    //   this.render();
    //
    //   this.collection.off();
    //   this.collection.on('sync', this.render, this);
    //
    //   // Get our Element On Our Page
    //   $('#coffeeList').html(this.$el);
    //
    //
    //
    // },
    //
    // render: function () {
    //   var self = this;
    //
    //   // Empty out
    //   this.$el.empty();
    //
    //   // Sorting On The Fly
    //   if (this.options.sort != undefined) {
    //     // Setting up a localized collection to sort by our sort param
    //     var local_collection = this.collection.sortBy( function (model) {
    //       return model.get(self.options.sort);
    //     });
    //     _.each(local_collection, function (c) {
    //       self.$el.append(self.template(c.toJSON()));
    //     })
    //   } else {
    //     // Sort from our default comparator in our collection constructor
    //     this.collection.sort();
    //     this.collection.each(function (c) {
    //       self.$el.append(self.template(c.toJSON()));
    //     });
    //   }
    //
    //
    //   if (this.options.showTwitter) {
    //     $('.hero-unit h1 a').html('Twitter');
    //   } else {
    //     $('.hero-unit h1 a').html('Coffee Snob');
    //   }
    //   return this;
    // }

  });

}());

(function () {

  App.Views.Book = Backbone.View.extend({
    //
    // tagName: 'ul',
    // className: 'coffeeSingle',
    //
    // events: {
    //   'submit #updateCoffee' : 'updateCoffee',
    //   'click #delete' : 'deleteCoffee'
    // },
    //
    // template: _.template($('#singleTemp').html()),
    //
    // initialize: function (options) {
    //   this.options = options;
    //   this.render();
    //
    //   $('#coffeeForm').empty();
    //
    //   // Get our Element On Our Page
    //   $('#coffeeList').html(this.$el);
    // },
    //
    // render: function () {
    //
    //   this.$el.empty();
    //
    //   this.$el.html(this.template(this.options.book.toJSON()));
    //
    // },
    //
    // updateCoffee: function (e) {
    //   e.preventDefault();
    //
    //   // Update our Model Instance
    //   this.options.book.set({
    //     // name: $('#update_name').val(),
    //     // brand: $('#update_brand').val(),
    //     // comments: $('#update_comments').val(),
    //     // rating: $('input[name="rating"]:checked').val()
    //   });
    //
    //   // Save Instance
    //   this.options.book.save();
    //
    //   // TODO - Check on promise
    //   App.router.navigate('', {trigger: true});
    //
    // },
    //
    // deleteCoffee: function (e) {
    //   e.preventDefault();
    //
    //   // Remove Coffee
    //   this.options.book.destroy();
    //
    //   // Go home ET
    //   App.router.navigate('', {trigger: true});
    //
    // }

  });

}());

(function () {

  App.Views.AddCoffee = Backbone.View.extend({

    // events: {
    //   'submit #addCoffee' : 'addCoffee'
    // },
    //
    // initialize: function () {
    //   this.render();
    //
    //   $('#coffeeList').html(this.$el);
    // },
    //
    // render: function () {
    //   this.$el.html($('#addTemp').html());
    // },
    //
    // addCoffee: function (e) {
    //   e.preventDefault();
    //
    //   var c = new App.Models.Coffee({
    //     name: $('#coffee_name').val(),
    //     brand: $('#coffee_brand').val()
    //   });
    //
    //   App.coffees.add(c).save(null, {
    //     success: function () {
    //       App.router.navigate('', { trigger: true });
    //     }
    //   });
    //
    // }

  });

}());


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



      }

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
