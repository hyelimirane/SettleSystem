/**
 * Created by hyelim on 2016. 3. 6..
 */
Template.meteorErrors.helpers({
    errors: function(){
        return Errors.collection.fine();
    }
});

Template.meteorError.rendered = function(){
    var error = this.data;
    Meteor.defer(function(){
       Errors.collection.update(error._id, {$set: {seen: true}});
    });
};