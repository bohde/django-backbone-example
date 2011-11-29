$(function(){
    var oldSync = Backbone.sync;
    Backbone.sync = function(method, model, success, error){
        var newSuccess = function(resp, status, xhr){
            if(xhr.statusText === "CREATED"){
                var location = xhr.getResponseHeader('Location');
                return $.ajax({
                    url: location,
                    success: success
                });
            }
            return success(resp);
        };
        return oldSync(method, model, newSuccess, error);
    };
    

    window.Tweet = Backbone.Model.extend({
        url: function(){
            return this.get('resource_uri') || this.collection.url;
        }, 
        foo: function() {
            
        }
    });

    window.Tweets = Backbone.Collection.extend({
        url: TWEET_API,

        parse: function(data){
            return data.objects;
        },
        foo: function(){
            var bar = this.foo,
                baz = foo.biz;
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

        events: {
            'click .tweet': 'createTweet'
        },

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
            var view = new TweetView({model:tweet});
            this.$('#tweets').append(view.render().el);
        },

        createTweet: function(){
            var tweet = this.$('#message').val();
            if(tweet){
                this.tweets.create({
                    message: tweet,
                    username: "Test User"
                });
                this.$('#message').val('');
            }
        }                                  
    });
    
    window.app = new App();
});