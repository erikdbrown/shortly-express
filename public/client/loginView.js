Shortly.createLoginView = Backbone.View.extend({
  className: 'creator',

  template: Templates['login'],

  render: function() {
    this.$el.html( this.template() );
    return this;
  }

});