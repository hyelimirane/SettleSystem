/**
 * Created by hyelim on 2016. 2. 24..
 */
Posts = new Mongo.Collection('posts');

/*
 Posts.allow({
 insert : function(userId, doc){
 // only allow posting if you are logged in
 return !! userId;
 }
 });
 */

Posts.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
    update: function(userId, post, fieldNames){
        // may only edit the following two fields:
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

// postSubmit 오류 검사
validatePost = function(post){
    var errors = {};
    if(!post.title)
        errors.title = "Please fill in a headline";
    if(!post.url)
        errors.url = "Please fill in a URL";
    return errors;
};

Meteor.methods({
    postInsert :function(postAttributes){
        check(Meteor.userId(), String);
        check(postAttributes, {
            title : String,
            url : String
        });

        var errors = validatePost(postAttributes);
        if(errors.title || errors.url)
            throw new Meteor.Error('invalid-post', "You must set a titel and URL for your post");

        /*
         if(Meteor.isServer){
         postAttributes.title += '(server)';
         // wait for 5 seconds.
         Meteor._sleepForMs(5000);
         } else{
         postAttributes.title += 'client';
         }
         */

        var postWriteSameLink = Posts.findOne({url : postAttributes.url});
        if(postWriteSameLink) {
            return {
                postExists: true,
                _id: postWriteSameLink._id
            };
        };

        var user = Meteor.user();
        // ._extend는 underscore라이브러리 메소드 단순히 하나의 객체에 속성을 추가하여 확장하는 기능 제공
        var post = _.extend(postAttributes, {
            userId : user._id,
            author : user.username,
            submitted : new Date(),
            commentsCount: 0
        });

        var postId = Posts.insert(post);
        return {
            _id : postId
        };
    }
});
