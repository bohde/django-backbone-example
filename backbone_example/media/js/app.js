(function(){
    window.Tweet = Backbone.Model.extend();

    window.Tweets = Backbone.Collection.extend({
        model: Tweet, 
        urlRoot: TWEET_API,

        maybeFetch: function(options){
            if(this._fetched){
                options.success && options.success();
                return;
            }
            var self = this,
                successWrapper = function(success){
                    return function(){
                        self._fetched = true;
                        success.apply(this, arguments);
                    };
                };
            options.success = successWrapper(options.success);
            this.fetch(options);
        },

        getOrFetch: function(id, cb){
            var model = this.get(id);

            if(model){
                cb(model);
                return;
            }

            model = new Tweet({
                id: id
            });
            model.fetch({
                success: render
            });
        }
        

    });

    window.TweetView = Backbone.View.extend({
        tagName: 'li',
        className: 'tweet',

        events: {
            'click .permalink': 'navigate'           
        },

        initialize: function(){
            this.model.bind('change', this.render, this);
        },

        navigate: function(e){
            this.trigger('navigate', this.model);
            e.preventDefault();
        },

        render: function(){
            $(this.el).html(ich.tweetTemplate(this.model.toJSON()));
            return this;
        }                                        
    });

    window.ListApp = Backbone.View.extend({
        el: '#app',

        events: {
            'click .tweet': 'createTweet',
            'keypress #message': 'createOnEnter'
        },

        initialize: function(){
            this.tweets = new Tweets();

            _.bindAll(this, 'addOne', 'addAll');

            this.tweets.bind('add', this.addOne);
            this.tweets.bind('reset', this.addAll, this);
            this.tweets.fetch();
            this.views = [];
        },

        addAll: function(){
            this.views = [];
            this.tweets.each(this.addOne);
        },

        addOne: function(tweet){
            var view = new TweetView({
                model:tweet
            });
            this.$('#tweets').prepend(view.render().el);
            this.views.push(view);
            view.bind('all', this.rethrow, this);
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
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
        },

        render: function(){
            
        }
    });
    
    window.DetailApp = TweetView.extend({
        el: '#app'
    });


    window.Router = Backbone.Router.extend({
        routes: {
            '/:id': 'detail',
            '/': 'list'
        },

        initialize: function(options){
            this.collection = new Tweets();
            this.fetched_collection = false;
            this.list_view = new ListApp({
                collection: this.collection
            });
            this.list_view.bind('navigate', this.navigate_to, this);
        },

        navigate_to: function(model){
            if(model){
                this.navigate('/' + model.get('id'));
            }else{
                this.navigate('/');
            }
        },

        detail: function(id){
            var render = function(model){
                    var view = new DetailApp({
                        model: model
                    }).render();
                };
            this.collection.getOrFetch(id, render);
        },

        list: function(){
            this.collection.maybeFetch({
                success: this.list_view.addAll
            });
        }
    });

    $(function(){
        window.app = new Router();
        Backbone.history.start({pushState: true});
    });
})();