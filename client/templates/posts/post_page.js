/**
 * Created by hyelim on 2016. 3. 6..
 */
Template.postPage.helpers({
   comments: function(){
       return Comments.find({postId: this._id});
   }
});