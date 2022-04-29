const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const Proposal = sequelize.define('proposals',{
            // id가 기본적으로 들어있다.
            title: {
                type: DataTypes.STRING(128), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
            period: {
                type: DataTypes.STRING(128), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
            content: {
                type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
            cost: {
                type: DataTypes.STRING(128), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
            evidence: {
                type: DataTypes.STRING(128), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
            type: {
                type: DataTypes.STRING(64), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', // 한글 저장
            sequelize,
        paranoid:true,
        });
    Proposal.associate = (db) => {
        db.Proposal.belongsTo(db.MessageRoom)
        db.Proposal.hasMany(db.Contract);
    }
    return Proposal
};
