## Prereqs:
    -Node.js
    -Cassandra
    -Dataset: 
        https://simplemaps.com/data/us-cities


## Instructions:
    -clone this repo
    -npm nodemon -g install
    -cd to the server repo
    -npm install
    -then repeat process for the client & parent repo
    -npm install
    -in a new terminal tab 
        -cassandra -f
    for cassandra:
     create keyspace & table(named 'location')
     create columns #1 city & #2 state
     seed db with columns 1 & 4 from dataset to local db
    -cd to parent repo
    -npm start

## Please note that this dataset does not have major cities as far as I've tested.