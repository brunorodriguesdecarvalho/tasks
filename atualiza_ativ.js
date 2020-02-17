var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
    if (err) throw err
    var dbo = dbpbsc.db("dbpbsc")
    var ObjectId = require('mongodb').ObjectID
    var busca = { _id: ObjectId("5e4ad8570484431dc4934ab5") }
    var atualiza = { $set: { ativRisk: "Muda ou o mundo não muda." } }
    dbo.collection("collativs").updateOne(busca, atualiza, function(err, res) {
        if (err) throw err
        console.log("1 doc atualizado: ", res)
        dbpbsc.close()
    })
})