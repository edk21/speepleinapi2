const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: (callback) => {
        client.connect((err, db) => {
            //we verify if we have the db
            if(db){
                _db = db.db("mySecondDatabase");
                console.log("Connected To MongoDB")
            }
            return callback(err);
        });
    },

    getDB: function () {
        return _db;
    },
};