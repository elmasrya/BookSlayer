(function () {


  App.Views.NavBar = Backbone.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
        'click .myList'     : 'myList',
        'click .homeBtn'    : 'home',
        'click .aboutBtn'   : 'about',
        'click .contactBtn' : 'contact'
    }, // end of events


    initialize: function () {


      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    myList: function () {
      App.router.navigate('myList', { trigger: true });
      new App.Views.MyBook();


    },

    home      : function() {

    },

    about     : function () {
      App.router.navigate('about', { trigger: true });
      new App.Views.About();

    },

    contact   : function () {

    }






  });

}());
