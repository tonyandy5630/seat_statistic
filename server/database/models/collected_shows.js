module.exports = (sequelize, DataTypes) => {
  const CollectedShow = sequelize.define(
    "collected_show",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      showId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seatRatio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      numberOfSeat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recordTime: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
    }
  );

  CollectedShow.associate = ({ show }) => {
    CollectedShow.hasOne(show, {
      foreignKey: "id",
    });
  };

  return CollectedShow;
};
