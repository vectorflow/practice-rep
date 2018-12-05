var gitDatabase = new mongoose.Schema({
    changedFiles : Number,
    committedDate : Date,
    committerName: String,
    id : String,
    message : String,
    messageBody : String,
    repositoryName: String,                              
    pushedDate: Date  
});
 
module.exports = mongoose.model("Git",gitDatabase);