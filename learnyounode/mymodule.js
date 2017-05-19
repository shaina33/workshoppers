module.exports = function (dir, ext, callback) {
    var fs = require('fs');
    var path = require('path');
    var ext = '.' + ext;
    fs.readdir(dir, function (err, list) {
        if (err) {
            return callback(err);
        }
        var fileArray = [];
        for (var i=0; i<list.length; i++) {
            if (path.extname(list[i]) === ext) {
                fileArray.push(list[i]);
            }
        }
        return callback(null, fileArray);
    });
}