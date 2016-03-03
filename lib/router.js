/**
 * Created by hyelim on 2016. 2. 25..
 */
Router.configure({
    layoutTemplate : 'layout',
    loadingTemplate : 'loading',
    notFoundTemplate : 'notFound',
    waitOn : function(){ return Meteor.subscribe('posts');}
});

Router.route('/', {name:'postsList'});

Router.route('/posts/:_id', {
    name : 'postPage',
    data : function() { return Posts.findOne(this.param._id); }
});

Router.route('/submit', {name:'postSubmit'});

var requireLogin = function() {
    if (! Meteor.user()) {
        if(Meteor.loggingIn()){
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});


//Router.map(function() {
    //this.route('postsList', {path:'/'});
//});