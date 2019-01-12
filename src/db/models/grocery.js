'use strict';
module.exports = (sequelize, DataTypes) => {
  var Grocery = sequelize.define('Grocery', {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Grocery.associate = function(models) {
    // associations can be defined here
  };
  return Grocery;
};