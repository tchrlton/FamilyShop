'use strict';
module.exports = (sequelize, DataTypes) => {
  var Grocery = sequelize.define('Grocery', {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Grocery.associate = function(models) {
    Grocery.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Grocery;
};