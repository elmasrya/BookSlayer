(function () {


  App.Views.NavBar = Parse.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
      'click .logout' : 'logout'
    }, // end of events


    initialize: function () {


      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    userStatus : function(){

      App.user = Parse.User.current();

      if(App.user === null){
        $('.logout').css('display');
      }
      else {
        $('#navLogin').text('Login');
      }

    },

      logout: function(e){

      var current = this.options;

      Parse.User.logOut();

      this.userStatus();

      this.initialize();

      App.router.navigate('', {trigger: true});

      // this.updateUser();

    }





  });

}());
