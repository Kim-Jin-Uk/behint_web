module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    'reports',
    {
      // id가 기본적으로 들어있다.
      type: {
        type: DataTypes.STRING(64), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      content: {
        type: DataTypes.DATE, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      condition: {
        type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
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
  Report.associate = (db) => {
    db.Report.belongsTo(db.User, { as: 'ReportingsId' });
  };
  return Report;
};
