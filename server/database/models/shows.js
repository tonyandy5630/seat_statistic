module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define(
    "show",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      movieName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cinemaName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      curDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      screenName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: "TIME",
        allowNull: false,
      },
      endTime: {
        type: "TIME",
        allowNull: false,
      },
      isCollected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      screenId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Show.associate = ({ movie }) => {
    Show.hasOne(movie, {
      foreignKey: "id",
    });
  };

  Show.associate = ({ collected_show }) => {
    Show.belongsTo(collected_show, {
      foreignKey: "id",
    });
  };

  Show.associate = ({ screen }) => {
    Show.hasOne(screen, {
      foreignKey: "id",
    });
  };

  return Show;
};
