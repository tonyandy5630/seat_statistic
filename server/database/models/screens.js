module.exports = (sequelize, DataTypes) => {
  const Screen = sequelize.define(
    "screen",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      maxSeatQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cinemaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cinemaName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      screenName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Screen.associate = ({ show }) => {
    Screen.hasMany(show, { foreignKey: "screenId" });
  };

  Screen.associate = ({ cinema }) => {
    Screen.belongsTo(cinema, { foreignKey: "cinemaId" });
  };
  return Screen;
};
