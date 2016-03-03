/**
 * Created by hyelim on 2016. 2. 24..
 */
Posts = new Mongo.Collection('posts');

Posts.allow({
    insert : function(userId, doc){
        // only allow posting if you are logged in
        return !! userId;
    }
});