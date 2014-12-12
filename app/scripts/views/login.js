(function () {


  App.Views.Login = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#loginTemp').html()),

    events: {
      'click .loginBtn' : 'login'
    }, // end of events


    initialize: function (options) {
      this.options=options;


      this.render();


    },

    render: function () {
      this.$el.html(this.template);
    },

    login : function (e) {


      e.preventDefault();

      var l = $('.usernameVal').val();
      var p = $('.passwordVal').val();

      Parse.User.logIn(l, p, {
        success: function (user) {
          App.user = user;
          $('.logOutFrame').text('Logout');
          console.log('Login successful');
            new App.Views.NavBar();
            new App.Views.Home();
            App.router.navigate('', {trigger: true});
        },
        error: function (user) {
          alert("Invalid Username and/or Password");
        }
      });

    }

  });


}());
