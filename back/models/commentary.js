module.exports = (sequelize, DataTypes) => {
  const Commentary = sequelize.define(
    'commentarys',
    {
      // id가 기본적으로 들어있다.
      title: {
        type: DataTypes.STRING(128), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      startTime: {
        type: DataTypes.TIME, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      endTime: {
        type: DataTypes.TIME, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      thumbnailImgUrl: {
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
  Commentary.associate = (db) => {
    db.Commentary.belongsTo(db.Project);
    db.Commentary.hasMany(db.CommentaryContent);
  };
  return Commentary;
};
