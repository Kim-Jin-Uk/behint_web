const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const Scrap = sequelize.define('scraps',{
        // id가 기본적으로 들어있다.
        name: {
            type: DataTypes.STRING(128), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: true, // 필수
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장
        sequelize,
        paranoid:true,
    });
    Scrap.associate = (db) => {
        db.Scrap.belongsTo(db.User)
    }
    return Scrap
};
