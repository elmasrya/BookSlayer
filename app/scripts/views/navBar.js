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
