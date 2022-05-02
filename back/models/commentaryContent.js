module.exports = (sequelize, DataTypes) => {
  const CommentaryContent = sequelize.define(
    'commentaryContents',
    {
      // id가 기본적으로 들어있다.
      content: {
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
  CommentaryContent.associate = (db) => {
    db.CommentaryContent.belongsTo(db.Commentary);
    db.CommentaryContent.belongsTo(db.User);
  };
  return CommentaryContent;
};
