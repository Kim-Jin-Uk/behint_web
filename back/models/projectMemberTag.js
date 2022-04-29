const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const ProjectMemberTag = sequelize.define('projectMemberTags',{
        // id가 기본적으로 들어있다.
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장
        sequelize,
        paranoid:true,
    });
    ProjectMemberTag.associate = (db) => {
        db.ProjectMemberTag.belongsTo(db.Tag)
        db.ProjectMemberTag.belongsTo(db.ProjectMember)
    }
    return ProjectMemberTag
};
