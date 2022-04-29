const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const CommentaryLike = sequelize.define('commentaryLikes',{
        // id가 기본적으로 들어있다.
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장
        sequelize,
        paranoid:true,
    });
    CommentaryLike.associate = (db) => {
        db.CommentaryLike.belongsTo(db.User)
        db.CommentaryLike.belongsTo(db.CommentaryContent)
    }
    return CommentaryLike
};
