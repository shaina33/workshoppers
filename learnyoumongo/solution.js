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