/**
 * Created by hyelim on 2016. 3. 3..
 */
Template.postSubmit.events({
    'submit form' : function(e){

        // 브라우저가 폼의 submit을 그대로 진행하지 않도록 차단단
       e.preventDefault();

        var post = {
            url : $(e.target).find('[name=url]').val(),
            title : $(e.target).find('[name=title]').val()
        }

        post._id = Posts.insert(post);
        Router.go('postPage', post);

    }
});