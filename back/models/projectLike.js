const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const ProjectLike = sequelize.define('projectLikes',{
        // id가 기본적으로 들어있다.
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
    ProjectLike.associate = (db) => {
        db.ProjectLike.belongsTo(db.User)
        db.ProjectLike.belongsTo(db.Project)
    }
    return ProjectLike
};
