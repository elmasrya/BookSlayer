(function () {


  App.Views.Login = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#loginTemp').html()),

    events: {
      'click .loginBtn' : 'goToAccount'
    }, // end of events


    initialize: function (options) {
      this.options=options;


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
        success: function (user) {
          App.user=user;
          $('.logOutFrame').text('Logout');

          console.log('Login successful');
            new App.Views.NavBar();
            new App.Views.Home();
            App.router.navigate('', {trigger: true});


        },

        error: function (user, error) {
          alert('Invalid user login');
        }

      }); // end of logIn
    } // end of go to account

  });


}());
