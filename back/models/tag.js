module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'tags',
    {
      // id가 기본적으로 들어있다.
      content: {
        type: DataTypes.STRING(128), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
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
  Tag.associate = (db) => {
    db.Tag.hasMany(db.ProjectMemberTag);
  };
  return Tag;
};
