const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('messages',{
            // id가 기본적으로 들어있다.
            content: {
                type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', // 한글 저장
            sequelize,
        paranoid:true,
        });
    Message.associate = (db) => {
        db.Message.belongsTo(db.User,{as:'SenderId'})
        db.Message.belongsTo(db.MessageRoom)
    }
    return Message
};
