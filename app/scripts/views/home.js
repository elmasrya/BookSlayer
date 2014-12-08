(function () {


  App.Views.Home = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#homeTemp').html()),

    events: {
        'click .signUpLink' : 'signUp',
        'click .loginLink'  : 'login'
    }, // end of events


    initialize: function () {

      
      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    signUp              : function () {
      App.router.navigate('signUp', { trigger: true });
      new App.Views.SignUp();


    },

    login     : function () {
      App.router.navigate('login', { trigger: true });
      new App.Views.Login();

    }



  });

}());
