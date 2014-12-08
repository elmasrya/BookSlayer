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


    logout: function(e){

      var current = this.options;
      Parse.User.logOut();
      App.user=null;
      App.router.navigate('', { trigger: true });
      new App.Views.Home();
      location.reload();
    }





  });

}());
