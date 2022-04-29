const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const Contract = sequelize.define('contracts',{
            // id가 기본적으로 들어있다.
            fileName: {
                type: DataTypes.STRING(128), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
            fileUrl: {
                type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: true, // 필수
            },
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', // 한글 저장
            sequelize,
        paranoid:true,
        });

    Contract.associate = (db) => {
        db.Contract.belongsTo(db.Proposal)
    }
    return Contract
};
