(function () {

/*parse view*/
  App.Views.SingleBook = Parse.View.extend({

events: {
    'click .deleteBtn' : 'delete',
    'click .slayBtn'   : 'slay'

}, // end of events


    template          : _.template($('#singleTemp').html()),



    initialize: function (options) {
      this.options=options;
      this.render();
      $("#middle").html(this.$el);
    },

    render: function () {
      var self = this;

      $("#middle").empty();

      this.$el.empty();

      this.$el.html(this.template(this.options.book.toJSON()));

    },

    delete : function (e) {
       e.preventDefault();

      // Remove Coffee
      this.options.book.destroy();

      // Go home ET
      App.router.navigate('profile', {trigger: true});

    },

    slay : function () {

      var bookTitle=$('.singleBookTitle').text();
      console.log(bookTitle);

      var pageString=$('.singlePageCount').text();
      pageNum=parseInt(pageString);
      console.log(pageNum);

      console.log(300 + " words");

      var rateString=$('.singleRadingLevel').text();
      rateNum=parseInt(rateString);
      console.log(rateNum + " words/minute");


      var minutes=60;
      console.log(minutes + " minutes/hr");

      var durationString=$('.singleDuration').text();
      durationNum=parseInt(durationString);
      console.log(durationNum + " days");

      var answerOne=(pageNum*300)/(rateNum)/(minutes)/(durationNum);
      var answerTwo=(pageNum*400)/(rateNum)/(minutes)/(durationNum);

      Number.prototype.toTime = function(){
        var hrs = Math.floor(this)
        var min = Math.round(this%1*60)
        min = min<10 ? "0"+min : min.toString();
        return hrs+":"+min+" minutes";
      }


      console.log("If you want to finish " + bookTitle + " in " + durationNum + " days, then you must read between " + answerOne.toTime() + " to "+ answerTwo.toTime() + " each day");
      $('.slayMessage').append("If you want to finish " + bookTitle + " in " + durationNum + " days, then you must read between " + answerOne.toTime() + " to "+ answerTwo.toTime() + " each day");
      console.log("working!!!");
    }



  });

}());
