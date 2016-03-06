/**
 * Created by hyelim on 2016. 2. 24..
 */
Meteor.publish('posts', function(){

    return Posts.find();
});

Meteor.publish('comments', function(postId){
    check(postId, String);
   return Comments.find({postId: postId});
});