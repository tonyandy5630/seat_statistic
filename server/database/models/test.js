module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define(
    "Test",
    {
      record: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "test",
    }
  );

  return Test;
};
