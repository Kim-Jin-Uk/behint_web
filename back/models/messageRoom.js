const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const MessageRoom = sequelize.define('messageRooms',{
            // id가 기본적으로 들어있다.
            accept: {
                type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
            receiverOut: {
                type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
            senderOut: {
                type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
            receiverReport: {
                type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
            senderReport: {
                type: DataTypes.BOOLEAN, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },

        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', // 한글 저장
            sequelize,
        paranoid:true,
        });
    MessageRoom.associate = (db) => {
        db.MessageRoom.belongsTo(db.User,{as:'SenderId'})
        db.MessageRoom.hasMany(db.Message);
        db.MessageRoom.hasMany(db.Proposal);
    }
    return MessageRoom
};
