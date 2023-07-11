module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define(
    "region",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Region.associate = ({ cinema }) => {
    Region.hasMany(cinema, { foreignKey: "regionId" });
  };

  return Region;
};
