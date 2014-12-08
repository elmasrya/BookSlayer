(function () {


  App.Views.SignUp = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#signUpTemp').html()),

    events: {
      'click .signUpBtn' : 'creatingProfile'
    }, // end of events


    initialize: function () {
      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    creatingProfile: function(e) {
      e.preventDefault();
      // New User Creation
      // Send New User to Server
      var user = new Parse.User({
        username: $('.createUsernameVal').val(),
        password: $('.createPasswordVal').val(),
        email: $('.emailVal').val()
      });
      user.signUp(null, {
        success: function(user) {
          console.log('Account created');
          new App.Views.Login({user: App.user});

        },
        error: function(user, error) {
          alert('Error');
          new App.Views.Home();
        }

      })

    }



  });

}());
