window.Shortly = Backbone.View.extend({
  template: Templates['layout'],

  events: {
    'click li a.index':  'renderIndexView',
    'click li a.create': 'renderCreateView',
    'click li a.logout': 'logUserOut'
  },

  initialize: function(){
    console.log( 'Shortly is running' );
    $('body').append(this.render().el);

    this.router = new Shortly.Router({ el: this.$el.find('#container') });
    this.router.on('route', this.updateNav, this);

    Backbone.history.start({ pushState: true });
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    e && e.preventDefault();
    this.router.navigate('/', { trigger: true });
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    this.router.navigate('/create', { trigger: true });
  },

  // assignToken: function (username, passwordHash) {
  //   console.log("clicked")
  //   var userObject = {
  //     username: username,
  //     passwordHash: passwordHash
  //   };

  //   var token = jwt.sign(userObject, 'secretkey', { expiresIn: '12h' }, function (token) {
  //     console.log('Token assigned as: ', token);
  //     $window.localStorage.accessToken = token;
  //   });
  // },

  logUserOut: function() {
    $.ajax({
      type: 'POST',
      url: '/logout',
      success: function(){
        console.log('logged out');
      }
    });
  },
  

  updateNav: function(routeName){
    this.$el.find('.navigation li a')
      .removeClass('selected')
      .filter('.' + routeName)
      .addClass('selected');
  }
});
