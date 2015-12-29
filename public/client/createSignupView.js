Shortly.createSignupView = Backbone.View.extend({
  className: 'creator',

  template: Templates['signup'],

  render: function() {
    this.$el.html( this.template() );
    return this;
  }

});