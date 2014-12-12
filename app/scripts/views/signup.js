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

      var newUser = new Parse.User({
        username: $('.createUsernameVal').val(),
        password: $('.createPasswordVal').val(),
        email: $('.emailVal').val()
      });

      var l = $('.createUsernameVal').val();
      var p = $('.createPasswordVal').val();

      newUser.signUp(null, {
        success: function(){
          Parse.User.logIn(l, p, {
            success: function (user) {
              var comp=0;
              var total=0;
              App.user = user;
              App.user.save({c: comp, t:total})
              App.router.navigate('#/', {trigger: true});
              location.reload();
              
            },
            error: function (user) {
              alert("Sign-in Not Valid.");
            }
          });
        }
      });

    }




  });

}());
