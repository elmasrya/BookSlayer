(function () {

/*parse view*/
  App.Views.Test = Parse.View.extend({


    events: {
      'click .start'    : 'start',
      'click .retake'   : 'retake'

    }, // end of events

    template          : _.template($('#testTemp').html()),

    initialize: function () {
      this.render();
      $("#middle").html(this.$el);
      $('.score').empty();
      $('.scoreH').remove();

    },

    render: function () {
      var self = this;

      $("#middle").empty();

      this.$el.empty();
      this.$el.html(this.template);

    },

    start: function (e) {
      e.preventDefault();


      var totalTime=0;
      var minutes=0;
      var seconds=0;
      var timer=setInterval(function() {
        $('.timer').empty();
          totalTime++;
          console.log(totalTime);
          seconds++;
          if(seconds<=9) {
        $('.timer').append(minutes + " min"+" : 0" + seconds + " sec");
      } else{
        $('.timer').append(minutes + " min"+" : " + seconds + " sec");
      }
        if(seconds===59){
          seconds=-1;
          minutes++;
        }

      }, 1000);

      $('.timer').empty();
      $('.start').remove();
      $('.ready').remove();
      $('.inst').remove();
      $('.scoreH').remove();
      $('.readingTest').css("display","block");
      $('.scoreH').remove();


      $('.stop').on('click', function(e){
        $('.stop').remove();
        $('.timer').empty();
        e.preventDefault();
        clearInterval(timer);
        score=(500)/(totalTime/60);
        console.log(score);
        roundedScore=parseInt(score);
        $('.retake').css("display","block");
        $('.saveScore').css("display","block");
        $('.score').append("<h2 class='scoreH'>Your Reading Rate is " + roundedScore + " words per minute</h2>");


        $('.saveScore').on('click', function(){

          App.user.save({wmp: roundedScore});
          new App.Views.Profile({user: App.user});
          App.router.navigate('profile', { trigger: true });
          


        });

      });
    },

    retake : function () {
      location.reload();
    }

  });
}());
