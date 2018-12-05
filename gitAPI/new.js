require('./DbWrite.js');
require('./commits.js');

const fetch = require('node-fetch');
var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/gitData");

// var gitDatabase = new mongoose.Schema({
//     changedFiles : Number,
//     committedDate : Date,
//     committerName: String,
//     id : String,
//     message : String,
//     messageBody : String,
//     repositoryName: String,                              
//     pushedDate: Date  
// });
 
// var git = mongoose.model("Git",gitDatabase);
var git= require('./user.js');
var edge={};
 
const accessToken = '8a665a43997494ef91d1d928a03cd90fef9eac9a';
// getCommits(accessToken,a,b);
const query = `
query{
    repository(owner: "vectorflow", name: "practice-rep") {
        ref(qualifiedName: "master") {
            target {
            ... on Commit {
                history() {
                    edges {
                        node {
                            changedFiles
                            committedDate
                            committer{
                                name
                            }
                            id
                            message
                            messageBody
                            repository{
                                name                                
                            }
                            pushedDate
                        }
                      }
                    }
                }
            }
        }
    }
}
`;
 
fetch('https://api.github.com/graphql', {
  method: 'POST',
  body: JSON.stringify({query}),
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
}).then(res => res.text())
  .then(body => one(body))
  .catch(error => console.error(error));

function one(body){
    var x=JSON.parse(body);
    var y=x.data.repository.ref.target.history.edges;
    writedb(y);
};

// function writedb(y){
//     var i=0;
//     y.forEach(function(){
//     var newGit = new git();
//     newGit.changedFiles=y[i].node.changedFiles;
//     newGit.committedDate=y[i].node.committedDate;
//     newGit.committerName=y[i].node.committer.name;
//     newGit.id=y[i].node.id;
//     newGit.message=y[i].node.message;
//     newGit.messageBody=y[i].node.messageBody;
//     newGit.repositoryName=y[i].node.repository.name;
//     newGit.pushedDate=y[i].node.pushedDate;
//     newGit.save();
//     console.log(y);
//     i++;
//     });    
// };