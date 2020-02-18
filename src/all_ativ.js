var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
    if (err) throw err
    var dbo = dbpbsc.db("dbpbsc")
    dbo.collection("collativs").find({}, {projection: { _id: 0 }}).toArray(function(err, res) {
        if (err) throw err
        console.log(res)
        console.log("O motivo do registro 4: ", res[4].ativRisk)
        dbpbsc.close()
    })
})