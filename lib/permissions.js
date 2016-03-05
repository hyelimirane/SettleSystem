/**
 * Created by hyelim on 2016. 3. 5..
 */
// check that the userId specified owns the documents
ownsDocument = function(userId, doc){
    return doc && doc.userId._id === userId;
}
