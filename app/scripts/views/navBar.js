(function () {


  App.Views.NavBar = Parse.View.extend({

    tagName: 'nav',

    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
      'click .logout' : 'logout'
    }, // end of events


    initialize: function (options) {

      this.options=options;
      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },


    logout: function(){

      var current = this.options;
      Parse.User.logOut();
      App.user=null;
      new App.Views.Home();
    }





  });

}());
