(function(){
    window.Tweet = Backbone.Model.extend();

    window.Tweets = Backbone.Collection.extend({
        model: Tweet, 
        urlRoot: TWEET_API
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
        el: '#app',

        events: {
            'click .tweet': 'createTweet',
            'keypress .tweet': 'createOnEnter'
        },

        initialize: function(){
            this.tweets = new Tweets();
            this.tweets.bind('add', this.addOne, this);
            this.tweets.bind('reset', this.addAll, this);
            this.tweets.fetch();
        },

        addAll: function(){
               this.tweets.each(this.addOne);
        },

        addOne: function(tweet){
               var view = new TweetView({
                model:tweet
            });
            this.$('#tweets').prepend(view.render().el);
        },

        createOnEnter: function(e){
            if((e.keyCode || e.which) == 13){
                this.createTweet();
                e.preventDefault();
            }

        },

        createTweet: function(){
            var tweet = this.$('#message').val();
            if(tweet){
                this.tweets.create({
                    message: tweet
                });
                this.$('#message').val('');
            }
        }                                  
    });
    
    $(function(){   
        window.app = new App();
    });
})();