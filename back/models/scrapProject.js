const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const ScrapProject = sequelize.define('scrapProjects',{
        // id가 기본적으로 들어있다.
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장
        sequelize,
        paranoid:true,
    });
    ScrapProject.associate = (db) => {
        db.ScrapProject.belongsTo(db.Scrap)
        db.ScrapProject.belongsTo(db.Project)
    }
    return ScrapProject
};
