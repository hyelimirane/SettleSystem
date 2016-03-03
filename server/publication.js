/**
 * Created by hyelim on 2016. 2. 24..
 */
Meteor.publish('posts', function(){

    return Posts.find();
});
