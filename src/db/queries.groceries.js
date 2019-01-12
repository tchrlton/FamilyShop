const Grocery = require("./models").Grocery;

module.exports = {
    getAllGroceries(callback){
        return Grocery.all()
        .then((groceries) => {
            callback(null, groceries);
        })
        .catch((err) => {
            callback(err);
        })
    }
}