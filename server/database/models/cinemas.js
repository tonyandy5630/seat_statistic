module.exports = (sequelize, DataTypes) => {
  const Cinema = sequelize.define(
    "cinema",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Cinema.associate = ({ screen }) => {
    Cinema.hasMany(screen, { foreignKey: "cinemaId" });
  };

  Cinema.associate = ({ region }) => {
    Cinema.belongsTo(region, { foreignKey: "regionId" });
  };

  return Cinema;
};
