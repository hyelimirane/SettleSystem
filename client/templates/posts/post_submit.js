/**
 * Created by hyelim on 2016. 3. 3..
 */
Template.postSubmit.create = function(){
    Session.set('postSubmitErrors', {});
};

Template.postSubmit.helpers({
    errorMessage : function(field){
        return Session.get('postSubmitErrors')[field];
    },
    errorClass : function(field){
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.postSubmit.events({
    'submit form' : function(e){

        // 브라우저가 폼의 submit을 그대로 진행하지 않도록 차단단
       e.preventDefault();

        var post = {
            url : $(e.target).find('[name=url]').val(),
            title : $(e.target).find('[name=title]').val()
        };

        var errors = validatePost(post);
        if(errors.title || errors.url)
            return Session.set('postSubmitErrors', errors);

        Meteor.call('postInsert', post, function(error, result){

            // display the error to the user and abort
            if(error)
                return throwError(error.reason);

            // show this result but route anyway
            if(result.postExists)
                return throwError('This link has already been posted');

            //Router.go('postPage', { _id : result._id});
            Router.go('postsList');
        });

        // post._id = Posts.insert(post);

    }
});