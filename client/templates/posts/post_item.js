/**
 * Created by hyelim on 2016. 2. 24..
 */
Template.postItem.helpers({
    ownPost : function(){
        var isOwn = false;
        console.log(this.userId);
        if(this.userId === Meteor.userId()){
            isOwn = true;
        }
        console.log(this.userId + " :: isOwn :: " + isOwn)
      return isOwn;
    },

    domain : function(){
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    }

/*    commentsCount: function(){
        return Comments.find({postId: this._id}).count();
    }
*/
});