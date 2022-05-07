const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Agreement extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        termOfService: {
          type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        personalInformation: {
          type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        eventReceive: {
          type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
      },
      {
        modelName: 'Agreement',
        tableName: 'agreements',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장
        sequelize,
        paranoid: true,
      },
    );
  }
  static associate(db) {
    db.Agreement.belongsTo(db.User);
  }
};
