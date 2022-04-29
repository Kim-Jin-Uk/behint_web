const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users',{
      // id가 기본적으로 들어있다.
      email: {
        type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, // 필수// 고유한 값
      },
      provider: {
        type: DataTypes.STRING(32),
        allowNull: true, // 필수
      },
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
      sequelize,
    paranoid:true,
    });
    User.associate = (db) => {
      db.User.hasOne(db.Agreement);
      db.User.hasMany(db.Profile);
      db.User.hasMany(db.Information);
      db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId',paranoid:true, });
      db.User.belongsToMany(db.User, { through: 'Ban', as: 'Banners', foreignKey: 'BanningId',paranoid:true, });
      db.User.hasMany(db.Report,{foreignKey:'ReportersId'});
      db.User.hasMany(db.MessageRoom,{foreignKey:'ReceiverId'});
      db.User.hasMany(db.Message,{foreignKey:'ReceiverId'});
      db.User.hasOne(db.Alarm);
      db.User.hasMany(db.Project);
      db.User.hasMany(db.ProjectMember);
      db.User.hasMany(db.Scrap);
      db.User.hasMany(db.ProjectLike);
      db.User.hasMany(db.CommentaryContent);
    }
    return User
};
