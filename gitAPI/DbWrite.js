module.exports=function writedb(y){
    var i=0;
    y.forEach(function(){
    var newGit = new git();
    newGit.changedFiles=y[i].node.changedFiles;
    newGit.committedDate=y[i].node.committedDate;
    newGit.committerName=y[i].node.committer.name;
    newGit.id=y[i].node.id;
    newGit.message=y[i].node.message;
    newGit.messageBody=y[i].node.messageBody;
    newGit.repositoryName=y[i].node.repository.name;
    newGit.pushedDate=y[i].node.pushedDate;
    newGit.save();
    i++;
    });    
};