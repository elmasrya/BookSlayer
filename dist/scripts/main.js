(function () {
  App.Models.Book = Parse.Object.extend({
    className: 'Book',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      readingLevel:0,
      pageCount: 0,
      user: '',
      duration:0,
      d: null,
      tOne: null,
      tTwo:null,
      status: ''
    },

    initialize : function () {

    }




  })

}());

(function () {
  App.Collections.Books = Parse.Collection.extend({

    model: App.Models.Book

  });

}());

(function () {


  App.Routers.AppRouter = Parse.Router.extend({


    initialize: function () {
    },

    routes: {
      ''                  : 'home',
      'about'             : 'about',
      'signup'            : 'signup',
      'login'             : 'login',
      'profile'           : 'profile',
      'search'            : 'search',
      'addBook'           : 'addBook',
      'test'              : 'test',
      'single/:objectId'  : 'single',
      'edit/:objectId'    : 'editBook',
      'addSearch'         : 'addSearch'
    },

    home: function () {
      new App.Views.Home();
      new App.Views.Footer();

    },

    about: function () {
      new App.Views.About();
      new App.Views.Footer();
    },

    signup: function () {
      new App.Views.SignUp();
      new App.Views.Footer();
    },

    login: function () {
      new App.Views.Login({user: App.user});
      new App.Views.Footer();
    },

    addBook: function () {
      new App.Views.AddBook({user: App.user});
      new App.Views.Footer();
    },

    profile: function () {
      if(App.user!==null) {
        console.log('we got auser and stuff');
        new App.Views.Profile({user: App.user});
        console.log('we rendered the profile');
        new App.Views.Footer();
        console.log('and the footer we rock');
      }else{
        new App.Views.Error();
      }

    },

    search: function () {
      if(App.user!==null) {
        new App.Views.Search();
        new App.Views.Footer();
      }else{
        new App.Views.Error();
      }
    },

    test: function () {
      if(App.user!==null) {
        new App.Views.Test();
        new App.Views.Footer();
      }else{
        new App.Views.Error();
      }
    },

    single: function (objectId) {
      if(App.user!==null) {
        var singleBook = App.books.get(objectId);
        new App.Views.SingleBook({book: singleBook, collection: App.books, user: App.user});
        new App.Views.Footer();
      }else{
        new App.Views.Error();
      }
    },

    editBook: function(objectId){
      if(App.user!==null) {
        var updateBook= App.books.get(objectId);
        new App.Views.EditBook({objectId: objectId, book: updateBook, user: App.user});
        new App.Views.Footer();
      }else{
        new App.Views.Error();
      }
    },

    addSearch : function() {
      new App.Views.AddSearch();
      new App.Views.Footer();
    },



  });

}());

(function(){

  App.Views.AddSearch = Parse.View.extend({



    tagName: 'form',
    className: 'Search',


    template        : _.template($('#addSearchTemp').html()),

    events: {
      'click .addSearchBtn': 'addSearch',

    },

    initialize   : function () {
      this.render();
      $("#middle").html(this.$el);

    },

    render  : function () {
      $("#middle").empty();

      this.$el.html(this.template);

    },

    addSearch : function (e) {

      e.preventDefault();

      if($('.bTitle').val() === ""){
        alert('Please add a book title.');
      }
      else if($('.rLevel').val() === ""){
        alert("Please put in a number for words per minute");
      }
      else if($('.pCount').val() === ""){
        alert("please put in a number for pages");
      }
      else if($('.dur').val() === ""){
        alert("please put in a number for days");
      }
      else{

        var b = new App.Models.Book({
          title: $('.bTitle').val(),
          readingLevel: $('.rLevel').val(),
          pageCount: $('.pCount').val(),
          duration: $('.dur').val(),
          user: App.user,
        });

        // Set Access Control List
        var bookACL = new Parse.ACL(App.user);
        bookACL.setPublicReadAccess(true);
        b.setACL(bookACL);

        b.save(null, {
          success: function () {
            App.books.add(b);
            new App.Views.Profile({user: App.user});
            App.router.navigate('profile', { trigger: true });
            location.reload();
            
          }
        });

      }

    }/*end of add book*/

  });

}());

(function () {

/*parse view*/
  App.Views.Error = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#errorTemp').html()),

    events: {


    }, // end of events


    initialize: function () {


      this.render();

    },

    render: function () {

      this.$el.html(this.template);

    },



  });

}());

(function () {


  App.Views.Search = Parse.View.extend({


    tagName: 'ul',
    className: 'allSearch',

    template          : _.template($('#searchBookTemp').html()),

    events: {
        'click .searchBtn' : 'searchBook'

    }, // end of events


    initialize: function () {

      this.render();
      $('#middle').html(this.$el);


    },

    render: function () {
      $("#middle").empty();

      this.$el.html(this.template());

    },

    searchBook : function (e) {

      e.preventDefault();
      $('.searchResults').empty();
      var inputVal=$('.searchBar').val();
      console.log(inputVal);
      $('.searchHeading').empty();
      $('.searchHeading').append("Your Search Results:");
      var googleApi="https://www.googleapis.com/books/v1/volumes?q="+inputVal+"&callback=App.handleResponse";
      $.ajax({
        type: 'GET',
        url: googleApi
      });

    App.handleResponse = function (response) {
      console.log("working");
      for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        // in production code, item.text should have the HTML entities escaped.

      $('.searchResults').append
          ("<div class='resultsFrame'>"+ "<div style='cursor: pointer;'class='choices' id='"+ i + "'><img class='connect' src='../images/bookPlus.png'></div>"
           + "<span class='googleBookTitle truncate' id='" +  i +"'>" + item.volumeInfo.title +"</span>"
           + "<center>" + "<img class='searchPic' src="+ item.volumeInfo.imageLinks.thumbnail + "/>"+ "</center>"
           +"<div class='preview'>" + "<a class='previewlink' href="+ item.volumeInfo.previewLink + ">Preview Book</a>" + "</div>"
           + "<span class='googlePageCountSearch' id='" +  i +"'>" + item.volumeInfo.pageCount + "</span>"+"</div>");



      }//End of loop


        $('.choices').on('click', function(){
          console.log("click");
          var elemID = this.id;
          console.log(elemID);

          var bookTitleSearch = $('.googleBookTitle[id=' + elemID + ']').text();
          var bookPageSearch = $('.googlePageCountSearch[id=' + elemID + ']').text();
          console.log(bookTitleSearch);
          /*If you dont instantiate elements may repaeat or pile up based up user*/

          new App.Views.AddSearch();
          App.router.navigate('addSearch', { trigger: true });

          $('.addSearchFrame').append
          ("<span class='bTitleLabel'>Book Title: " + "</span>"
          + "<input class='bTitle' type='text' value='"+ bookTitleSearch + "'>"
          + "<span class='q1'>How many pages are in the book? " + "</span>"
          + "<input class='pCount' type='number' value='"+ bookPageSearch + "'>"  + "<span class='unit'>" + " pages" + "</span>"
          + "<span class='qLevel'>Reading Rate: " + "</span>"
          + "<input class='rLevel' type='number' value='" + App.user.attributes.wmp +"'/>" + "<span class='unitMin'>" + " per minute" + "</span>"
          + "<span class='q2'>How many days do you want this book finished by? " + "</span>"
          + "<input class='dur' type='number' placeholder='How many days?' />" + "<span class='unitDays'>" + " days" + "</span>");

        });

    }/*End of handle response*/



  }/*end of search function*/




  });



}());

(function () {

/*parse view*/
  App.Views.EditBook = Parse.View.extend({

      tagName: 'form',
      className: 'createForm',


    template          : _.template($('#editTemp').html()),

    events: {
      'click .saveEdit' : 'edit'

    }, // end of events


    initialize: function (options) {
      this.options=options;
      this.render();
      $("#middle").html(this.$el);

    },

    render: function () {
      var self = this;
      $("#middle").empty();
      this.$el.html(this.template(this.options.book.toJSON()));


    },

    edit: function(e){
      e.preventDefault();


      if($('.bookTitle').val() === ""){
        alert('Please add a book title.');
      }
      else if($('.readingLevel option:selected').val() === ""){
        alert("Please select a reading level");
      }
      else if($('.pageCount').val() === ""){
        alert("please put in page count");
      }
      else if($('.duration').val() === ""){
        alert("please put in how many days");
      }
      else{

        this.options.book.set({
          title: $('.bookTitle').val(),
          readingLevel: $('.readingLevel').val(),
          pageCount: $('.pageCount').val(),
          duration: $('.duration').val(),
          user: App.user,
        });

        var editedBook=this.options.book.id;

        this.options.book.save(null, {
          success: function () {
            App.router.navigate('single/'+ editedBook, { trigger: true });
          }
        });
      }
    }



  });

}());

(function () {


  App.Views.NavBar = Parse.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
      'click .logOutFrame' : 'logout'
    }, // end of events


    initialize: function (options) {

      this.options=options;
      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    updateUser: function(){

      App.user = Parse.User.current();

      if(App.user !== null){
        $('.logOutFrame').text('Logout');
      }
      else {
        $('.logOutFrame').remove();
      }

    },


    logout: function(e){
      var current = this.options;

      $('.logOutFrame').remove();
      Parse.User.logOut();
      this.updateUser();
      this.initialize();
      $('#tools').empty();
      new App.Views.Home();


    }






  });

}());

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

(function(){

  App.Views.AddBook = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',


    template        : _.template($('#addBookTemp').html()),

    events: {
      'click .addBookBtn': 'addBook',

    },

    initialize   : function (options) {
      this.options=options;
      this.render();
      $("#middle").html(this.$el);

    },

    render  : function () {
    $("#middle").empty();

      this.$el.html(this.template());

    },

    addBook : function (e) {

      e.preventDefault();

      if($('.bookTitle').val() === ""){
        alert('Please add a book title.');
      }
      else if($('.readingLevel').val() === ""){
        alert("Please put in a number for words per minute");
      }
      else if($('.pageCount').val() === ""){
        alert("please put in a number for pages");
      }
      else if($('.duration').val() === ""){
        alert("please put in a number for days");
      }
      else{

        var b = new App.Models.Book({
          title: $('.bookTitle').val(),
          readingLevel: $('.readingLevel').val(),
          pageCount: $('.pageCount').val(),
          duration: $('.duration').val(),
          user: App.user,
        });

        // Set Access Control List
        var bookACL = new Parse.ACL(App.user);
        bookACL.setPublicReadAccess(true);
        b.setACL(bookACL);

        b.save(null, {
          success: function () {
            App.books.add(b);
            new App.Views.Profile({user: App.user});
            App.router.navigate('profile', { trigger: true });
            location.reload();


          }
        });

      }

    }/*end of add book*/

  });

}());

(function () {

  App.Views.Profile = Parse.View.extend({


    tagName: 'ul',
    className: 'allBooks',

    events: {
    }, // end of events

    templateOne                : _.template($('#profileUpLeftTemp').html()),
    templateTwo                : _.template($('#profileLowLeftTemp').html()),
    templateThree              : _.template($('#profileRightTemp').html()),
    middleFixerTemplate        : _.template($('#threeTemps').html()),

    initialize              : function (options) {
      this.options = options;
      $('#middle').empty();
      // console.log(this.options.user);
      this.render();
      }, // end of initialize

    render                  : function () {

      $('#middle').html(this.middleFixerTemplate);
      $('#tools').html(this.templateTools);
      this.bookQuery();
      this.sideRead();
      this.sideScore();
    },

    sideScore    : function () {
      var self = this;
      $('#upperL').html(self.templateOne(App.user));
      },

    sideRead    : function () {
        var self = this;
        $('#lowerL').html(self.templateTwo(App.user));
      },

    bookQuery : function () {
      var self = this;
      var myBook_query = new Parse.Query(App.Models.Book);
      myBook_query.equalTo('user', this.options.user);
      myBook_query.descending("updatedAt");
      myBook_query.find({
        success: function(books){
          _.each(books, function(b) {
            $('#middleRight').append(self.templateThree(b.toJSON()));
          });
        }
      });
    }

  }); // end of view


}()); // end of IIF

(function () {

/*parse view*/
  App.Views.About = Parse.View.extend({


    el                : '#middle',

    template          : _.template($('#aboutTemp').html()),

    events: {


    }, // end of events


    initialize: function () {


      this.render();

    },

    render: function () {

      this.$el.html(this.template);

    },



  });

}());

(function () {


  App.Views.NavBar = Parse.View.extend({


    el                : '#top',

    template          : _.template($('#navBarTemp').html()),

    events: {
      'click .logOutFrame' : 'logout'
    }, // end of events


    initialize: function (options) {

      this.options=options;
      this.render();


    },

    render: function () {

      this.$el.html(this.template);
    },

    updateUser: function(){

      App.user = Parse.User.current();

      if(App.user !== null){
        $('.logOutFrame').text('Logout');
      }
      else {
        $('.logOutFrame').remove();
      }

    },


    logout: function(e){
      var current = this.options;

      $('.logOutFrame').remove();
      Parse.User.logOut();
      this.updateUser();
      this.initialize();
      $('#tools').empty();
      new App.Views.Home();


    }






  });

}());

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

(function () {


  App.Views.Footer = Parse.View.extend({


    el                : '#bottom',

    template          : _.template($('#footerTemp').html()),

    events: {


    }, // end of events


    initialize: function () {
      this.render();

    },

    render: function () {

      this.$el.html(this.template);

    },



  });

}());

Parse.initialize("MCSNBPaOJowTLp0LZqcG2hPRLKsPlTqHeKT3CK3P","JRsBK5g0aam1H89lxIcZIqRTSllbuiASaNIkz9G7");

(function() {

  App.books = new App.Collections.Books();

  App.user = Parse.User.current();


  new App.Views.NavBar({user: App.user});


  App.books.fetch().done(function () {
      App.router = new App.Routers.AppRouter();
      Parse.history.start();
  });


  
}());
