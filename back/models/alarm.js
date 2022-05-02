module.exports = (sequelize, DataTypes) => {
  const Alarm = sequelize.define(
    'alarms',
    {
      // id가 기본적으로 들어있다.
      banner: {
        type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      myProject: {
        type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      invite: {
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

  Alarm.associate = (db) => {
    db.Alarm.belongsTo(db.User);
  };
  return Alarm;
};
