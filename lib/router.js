/**
 * Created by hyelim on 2016. 2. 25..
 */
Router.configure({
    layoutTemplate : 'layout',
    loadingTemplate : 'loading',
    notFoundTemplate : 'notFound',
    waitOn : function(){ return Meteor.subscribe('posts');}
});

/*
Router.route('/', {name:'postsList'});

Router.route('/posts/:_id', {
    name : 'postPage',
    data : function() { return Posts.findOne(this.param._id); }
});

Router.route('/submit', {name:'postSubmit'});
*/

Router.map(function() {
    this.route('postsList', { path : '/' });

    this.route('postPage', {
        path : '/posts/:_id',
        data : function() { return Posts.findOne(this.params._id); }
    });

    this.route('postEdit', {
        path : '/posts/:_id/edit',
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

//Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});


//Router.map(function() {
    //this.route('postsList', {path:'/'});
//});