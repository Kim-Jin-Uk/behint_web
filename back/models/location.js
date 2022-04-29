const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('locations',{
        // id가 기본적으로 들어있다.
        name: {
            type: DataTypes.STRING(256), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: true, // 필수
        },
        latitude: {
            type: DataTypes.FLOAT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: true, // 필수
        },
        longitude: {
            type: DataTypes.FLOAT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: true, // 필수
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장
        sequelize,
        paranoid:true,
    });
    Location.associate = (db) => {
        db.Location.belongsTo(db.Project)
    }
    return Location
};
