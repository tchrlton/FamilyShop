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
    },
    addGrocery(newGrocery, callback){
        return Grocery.create({
            item: newGrocery.item,
            purchased: false,
            userId: newGrocery.userId
        })
        .then((grocery) => {
            callback(null, grocery);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getGrocery(id, callback){
        return Grocery.findById(id)
        .then((grocery) => {
          callback(null, grocery);
        })
        .catch((err) => {
          callback(err);
        })
    },
    deleteGrocery(id, callback){
        return Grocery.destroy({
          where: {id}
        })
        .then((grocery) => {
          callback(null, grocery);
        })
        .catch((err) => {
          callback(err);
        })
    },
    updateGrocery(id, updatedGrocery, callback){
        return Grocery.findById(id)
        .then((grocery) => {
          if(!grocery){
            return callback("Grocery not found");
          }
          grocery.update(updatedGrocery, {
            fields: Object.keys(updatedGrocery)
          })
          .then(() => {
            callback(null, grocery);
          })
          .catch((err) => {
            console.log(err);
            callback(err);
          });
        });
    }
}