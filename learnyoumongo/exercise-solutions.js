// #3 FIND
var mongo = require('mongodb').MongoClient;
var databaseURL = 'mongodb://localhost:27017/learnyoumongo';
mongo.connect(databaseURL, function(err, db) {
    if (err) {
        return console.error(err);
    }
    db.collection('parrots')
      .find({
        age: { $gt: parseInt(process.argv[2]) }
      })
      .toArray(function(err, docs) {
        if (err) {
            return console.error(err);
        }
        console.log(docs);
      })
    db.close()
})

// #4 FIND PROJECT
// note: add projection to find()
var mongo = require('mongodb').MongoClient;
var databaseURL = 'mongodb://localhost:27017/learnyoumongo';
mongo.connect(databaseURL, function(err, db) {
    if (err) {
        return console.error(err);
    }
    db.collection('parrots')
      .find({
        age: { $gt: parseInt(process.argv[2]) }
      }, {
        name: 1,
        age: 1,
        _id: 0
      })
      .toArray(function(err, docs) {
        if (err) {
            return console.error(err);
        }
        console.log(docs);
      })
    db.close()
})

// #5 INSERT
// note: I purposely decided to print the inserted doc, rather than just the newDoc object made prior to insertion.
var mongo = require('mongodb').MongoClient;
var databaseURL = 'mongodb://localhost:27017/learnyoumongo';
mongo.connect(databaseURL, function(err, db) {
    if (err) { throw err }
    var newDoc = {
        firstName: process.argv[2],
        lastName: process.argv[3]
    };
    db.collection('docs')
      .insertOne(newDoc, null, function(err, result) {
        if (err) { throw err }
        console.log(JSON.stringify(result.ops[0]));
    })
    db.close()
})

// #6 UPDATE
var mongo = require('mongodb').MongoClient;
var databaseName = process.argv[2];
var databaseURL = 'mongodb://localhost:27017/' + databaseName;
mongo.connect(databaseURL, function(err, db) {
    if (err) { throw err }
    db.collection('users').updateOne( {
        username: 'tinatime'
    }, {
        $set: {
            age: 40
        }
    }, function(err, result) {
        if (err) {throw err}
    })
    db.close()
})

// #7 REMOVE
var mongo = require('mongodb').MongoClient;
var databaseName = process.argv[2];
var databaseURL = 'mongodb://localhost:27017/' + databaseName;
var collectionName = process.argv[3];
var id = process.argv[4];
mongo.connect(databaseURL, function(err, db) {
    if (err) { throw err }
    db.collection(collectionName).remove( {
        _id: id
    }, function(err, result) {
        if (err) {throw err}
    })
    db.close()
})

// #8 COUNT
var mongo = require('mongodb').MongoClient;
var databaseURL = 'mongodb://localhost:27017/learnyoumongo';
var minAge = Number(process.argv[2]);
mongo.connect(databaseURL, function(err, db) {
    if (err) { throw err }
    db.collection('parrots').count( {
        age: {
            $gt: minAge
        }
    }, function(err, result) {
        if (err) {throw err}
        console.log(result);
    })
    db.close()
})

// #9 AGGREGATE
var mongo = require('mongodb').MongoClient;
var databaseURL = 'mongodb://localhost:27017/learnyoumongo';
var size = process.argv[2];
mongo.connect(databaseURL, function(err, db) {
    if (err) { throw err }
    db.collection('prices').aggregate([
        { $match: {size: size} },
        { $group: { _id: 'average_price',
                    average_price: { $avg: '$price' }}}
    ], function(err, results) {
        if (err) {throw err}
        console.log(results[0].average_price.toFixed(2));
    })
    db.close()
})