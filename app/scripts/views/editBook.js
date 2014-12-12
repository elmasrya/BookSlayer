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
