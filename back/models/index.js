import Sequelize from 'sequelize';
import configure from '../config/config';
const env = process.env.NODE_ENV || 'development';
const config = configure[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize);
db.Agreement = require('./agreement')(sequelize, Sequelize);
db.Information = require('./information')(sequelize, Sequelize);
db.Profile = require('./profile')(sequelize, Sequelize);
db.Report = require('./report')(sequelize, Sequelize);
db.Message = require('./message')(sequelize, Sequelize);
db.MessageRoom = require('./messageRoom')(sequelize, Sequelize);
db.Proposal = require('./proposal')(sequelize, Sequelize);
db.Contract = require('./contract')(sequelize, Sequelize);
db.Project = require('./project')(sequelize, Sequelize);
db.ProjectMember = require('./projectMember')(sequelize, Sequelize);
db.ProjectMemberTag = require('./projectMemberTag')(sequelize, Sequelize);
db.Tag = require('./tag')(sequelize, Sequelize);
db.Location = require('./location')(sequelize, Sequelize);
db.Alarm = require('./alarm')(sequelize, Sequelize);
db.Commentary = require('./commentary')(sequelize, Sequelize);
db.CommentaryContent = require('./commentaryContent')(sequelize, Sequelize);
db.CommentaryLike = require('./commentaryLike')(sequelize, Sequelize);
db.Scrap = require('./scrap')(sequelize, Sequelize);
db.ScrapProject = require('./scrapProject')(sequelize, Sequelize);
db.ProjectLike = require('./projectLike')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
