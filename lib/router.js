/**
 * Created by hyelim on 2016. 2. 25..
 */
Router.configure({
    layoutTemplate : 'layout',
    loadingTemplate : 'loading',
    notFoundTemplate : 'notFound',
    waitOn : function(){
        return [Meteor.subscribe('notifications')];
    }
});

/*
Router.route('/', {name:'postsList'});

Router.route('/posts/:_id', {
    name : 'postPage',
    data : function() { return Posts.findOne(this.param._id); }
});

Router.route('/submit', {name:'postSubmit'});
*/


PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function(){
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function(){
        return {sort: {submitted: -1}, limit: this.postsLimit()}
    },
    /*waitOn: function(){
        return Meteor.subscribe('posts', this.findOptions());
    },*/
    subscriptions: function(){
      this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function(){
        return Posts.find({}, this.findOptions());
    },
    data: function(){
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});

        //console.log("##### hasMore :: "+ hasMore);
        //console.log("##### nextPath :: "+ nextPath);

        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? nextPath : null
        };
    }
});

Router.route('/:postsLimit?', {
    name: 'postsList'
});

Router.map(function() {
    //this.route('postsList', { path : '/' });

    this.route('postPage', {
        path : '/posts/:_id',
        waitOn: function(){
            return [
                Meteor.subscribe('singlePost', this.params._id),
                Meteor.subscribe('comments', this.params._id)
            ];
        },

        data : function() { return Posts.findOne(this.params._id); }
    });

    this.route('postEdit', {
        path : '/posts/:_id/edit',
        waitOn: function(){
            return Meteor.subscribe('singlePost', this.params._id);
        },
        data : function() { return Posts.findOne(this.params._id); }
    });

    this.route('postSubmit', { path : '/submit'});
});

var requireLogin = function() {
    if (! Meteor.user()) {
        if(Meteor.loggingIn()){
            //this.render(this.loadingTemplate);
            this.render('loading');
        } else {
            this.render('accessDenied');
        }

        this.stop();
    }
    else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});


//Router.map(function() {
    //this.route('postsList', {path:'/'});
//});