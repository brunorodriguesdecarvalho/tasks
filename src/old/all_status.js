function listarStatus() {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, dbpbsc) {
        if (err)
            throw err;
        var dbo = dbpbsc.db("dbpbsc");
        dbo.collection("ragstatus").find({}, { projection: { _id: 0 } }).toArray(function (err, res) {
            if (err)
                throw err;
            console.log(res);
            dbpbsc.close();
        });
    });
}
