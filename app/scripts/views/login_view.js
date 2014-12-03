(function () {


  App.Views.Login = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#loginTemp').html()),

    events: {
      'click .loginBtn' : 'goToAccount'
    }, // end of events


    initialize: function () {


      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    goToAccount : function () {
      // Log User into account
      var username = $('.usernameVal').val();
      var password = $('.passwordVal').val();
      Parse.User.logIn(username, password, {
        success: function () {
          console.log('Login successful');
          // Route back to home page
          $('#upperRegion').empty();
          $('#middleRegion').empty();
          new App.Views.Home();
          App.router.navigate('', {trigger: true});
        },
        error: function (user, error) {
          console.log('wrong');
        }
      }); // end of logIn
    } // end of go to account

  });


}());
