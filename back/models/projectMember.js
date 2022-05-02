module.exports = (sequelize, DataTypes) => {
  const ProjectMember = sequelize.define(
    'projectMembers',
    {
      // id가 기본적으로 들어있다.
      signup: {
        type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      accept: {
        type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      position: {
        type: DataTypes.STRING(64), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
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
  ProjectMember.associate = (db) => {
    db.ProjectMember.belongsTo(db.User);
    db.ProjectMember.belongsTo(db.Project);
    db.ProjectMember.hasMany(db.ProjectMemberTag);
  };
  return ProjectMember;
};
