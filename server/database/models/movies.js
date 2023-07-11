module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "movie",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      movieName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieLength: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  Movie.associate = ({ show }) => {
    Movie.hasMany(show, {
      foreignKey: "movieId",
    });
  };

  return Movie;
};
