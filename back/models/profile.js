module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'profiles',
    {
      // id가 기본적으로 들어있다.
      nickname: {
        type: DataTypes.STRING(32), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      job: {
        type: DataTypes.STRING(32), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      location: {
        type: DataTypes.STRING(32), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      profileImgUrl: {
        type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      introduce: {
        type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      instagramUrl: {
        type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      facebookUrl: {
        type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      tweeterUrl: {
        type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      etcUrl: {
        type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      mainProjects: {
        type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 한글 저장
      sequelize,
      paranoid: true,
    },
  );
  Profile.associate = (db) => {
    db.Profile.belongsTo(db.User);
  };
  return Profile;
};
