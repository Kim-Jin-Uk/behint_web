module.exports = (sequelize, DataTypes) => {
  const Information = sequelize.define(
    'informations',
    {
      // id가 기본적으로 들어있다.
      title: {
        type: DataTypes.STRING(64), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      startDate: {
        type: DataTypes.DATE, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      endDate: {
        type: DataTypes.DATE, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      position: {
        type: DataTypes.STRING(128), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      detailContents: {
        type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: true, // 필수
      },
      informationUrl: {
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

  Information.associate = (db) => {
    db.Information.belongsTo(db.User);
  };
  return Information;
};
