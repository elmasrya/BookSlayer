(function () {


  App.Views.NavBar = Parse.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
      'click .logOutFrame' : 'logout'
    }, // end of events


    initialize: function (options) {

      this.options=options;
      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    updateUser: function(){

      App.user = Parse.User.current();

      if(App.user !== null){
        $('.logOutFrame').text('Logout');
      }
      else {
        $('.logOutFrame').remove();
      }

    },


    logout: function(e){
      var current = this.options;

      $('.logOutFrame').remove();
      Parse.User.logOut();
      this.updateUser();
      this.initialize();
      new App.Views.Home();


    }






  });

}());
