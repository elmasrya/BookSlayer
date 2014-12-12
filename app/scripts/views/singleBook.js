(function () {

/*parse view*/
  App.Views.SingleBook = Parse.View.extend({

events: {
    'click .deleteBtn' : 'delete',
    'click .slayBtn'   : 'slay',
    'click .cancelPlan': 'cancelP',
    'click .finished'  : 'finished',
    'click .unfinished': 'unfinished'

}, // end of events


    template          : _.template($('#singleTemp').html()),



    initialize: function (options) {
      this.options=options;
      var bookExist=this.options;
      var plan=(this.options.book.attributes);
      console.log(bookExist);


      this.render();
      $("#middle").html(this.$el);
    },

    render: function () {
      var self = this;


      this.$el.empty();

      this.$el.html(this.template(this.options.book.toJSON()));

    },

    delete : function (e) {
       e.preventDefault();

      // Remove
        this.options.book.destroy();

      App.router.navigate('profile', {trigger: true});

    },

    slay : function (e) {
      var b=this.options.book;

      e.preventDefault();
      $('.slayMessage').empty();

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
        return hrs+"h : "+min+"m";
      }


      var messageString = "If you want to finish " + bookTitle + " in " + durationNum + " days, then you must read between " + answerOne.toTime() + " to "+ answerTwo.toTime() + " each day";
      var days=durationNum;
      var t1=answerOne.toTime();
      var t2=answerTwo.toTime();

      $('.slayMessage').append(messageString);
      $('.planFrame').append("<button class='savePlan'>" + "Save QuickSlayer" + "</button>");
      $('.planFrame').append("<button class='cancelPlan'>" + "Cancel Plan"+ "</button>");

      $('.savePlan').on('click', function(e){
        e.preventDefault();
        b.save({d: days, tOne: t1, tTwo:t2, status:'Slayer Phase'});
        App.router.navigate('profile', {trigger: true});
    });
    },

    finished  : function (e) {
      e.preventDefault();
      var a=App.user.attributes.c;
      var b=App.user.attributes.t;
      a++;
      b++;
      console.log(b);
      console.log(b);
      App.user.save({c: a, t:b });
      this.options.book.destroy();
      new App.Views.Profile({user: App.user});
      App.router.navigate('profile', {trigger: true});

    },

    unfinished  : function (e) {
      e.preventDefault();
      var p=App.user.attributes.c;
      var q=App.user.attributes.t;
      q++;
      App.user.save({t: q, c: p });
      console.log(p);
      console.log(ans);
      this.options.book.destroy();
      new App.Views.Profile({user: App.user});
      App.router.navigate('profile', {trigger: true});

    },

    cancelP   : function (e) {
      e.preventDefault();
      location.reload();

    }





  });

}());
