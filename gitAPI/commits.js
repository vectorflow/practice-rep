require('./DbWrite.js');

const fetch = require('node-fetch');
function getCommitrange(accessToken,a,b){
    const query = `
    query($a:GitTimestamp, $b:GitTimestamp){
        repository(owner: "vectorflow", name: "practice-rep") {
            ref(qualifiedName: "master") {
                target {
                ... on Commit {
                    history(since: $a, until: $b) {
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
    body: JSON.stringify({query,variables:{a,b}}),
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
};