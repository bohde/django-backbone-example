$(function(){
    window.Tweet = Backbone.Model.extend({
      url: function(){
         return this.get('resource_uri') || this.collection.url;
      }
    });

    window.Tweets = Backbone.Collection.extend({
      url: TWEET_API,

      parse: function(data){
          return data.objects;
      }                                             
    });

    window.TweetView = Backbone.View.extend({
      tagName: 'li',
      className: 'tweet',

      render: function(){
          $(this.el).html(ich.tweetTemplate(this.model.toJSON()));
          return this;
      }                                        
    });

    window.App = Backbone.View.extend({
      el: $('#app'),

      initialize: function(){
          _.bindAll(this, 'addOne', 'addAll', 'render');
          this.tweets = new Tweets();
          this.tweets.bind('add', this.addOne);
          this.tweets.bind('refresh', this.addAll);
          this.tweets.bind('all', this.render);
          this.tweets.fetch();
      },

      addAll: function(){
          this.tweets.each(this.addOne);
      },

      addOne: function(tweet){
          view = new TweetView({model:tweet});
          this.$('#tweets').append(view.render().el);
      }                                        
    });
      
    window.app = new App();
});