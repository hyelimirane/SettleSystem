/**
 * Created by hyelim on 2016. 2. 24..
 */
Template.postItem.helpers({
    domain : function(){
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    }
});