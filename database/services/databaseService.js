'use strict';


var database = require('../../config/database'),
    Sequelize = require('sequelize');

const sequelize =new Sequelize(
    database.db.name,
    database.db.user,
    database.db.password,
    database.db.details
);


// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models/tables

// Master tables
db.Client = require('../models/master/Client.js')(sequelize, Sequelize);
db.UserRole = require('../models/master/UserRole.js')(sequelize, Sequelize);

db.Country = require('../models/master/Country.js')(sequelize, Sequelize);
db.State = require('../models/master/State.js')(sequelize, Sequelize);
db.City = require('../models/master/City.js')(sequelize, Sequelize);
db.Status = require('../models/master/Status.js')(sequelize, Sequelize);
db.BusinessDomain = require('../models/master/BusinessDomain.js')(sequelize, Sequelize);

db.affiliation_mst = require('../models/master/Affiliation.js')(sequelize, Sequelize);
db.ResearchInterest = require('../models/master/ResearchInterest.js')(sequelize, Sequelize);
db.Stream = require('../models/master/Stream.js')(sequelize, Sequelize);
db.Qualification = require('../models/master/Qualification.js')(sequelize, Sequelize);
db.Designation = require('../models/master/Designation.js')(sequelize, Sequelize);
db.KWConfig = require('../models/master/KWConfig.js')(sequelize, Sequelize);
db.eventtype_mst = require('../models/master/EventType.js')(sequelize, Sequelize);
db.venue_mst = require('../models/master/Venue.js')(sequelize, Sequelize);
db.event_mst = require('../models/master/Event.js')(sequelize, Sequelize);
db.orator_mst = require('../models/master/Orator.js')(sequelize, Sequelize);
db.eventsessions_mst = require('../models/master/EventSessions.js')(sequelize, Sequelize);
db.questionstatus_mst = require('../models/master/QuestionStatus.js')(sequelize, Sequelize);
db.specialization_mst = require('../models/master/Specialization.js')(sequelize, Sequelize);
db.UserConfig_MST = require('../models/master/UserConfig.js')(sequelize, Sequelize);

// Transaction tables
db.Errors = require('../models/transaction/Errors.js')(sequelize, Sequelize);
db.User = require('../models/transaction/User.js')(sequelize, Sequelize);
db.UserContactDetail = require('../models/transaction/UserContactDetail.js')(sequelize, Sequelize);
db.UserAudit = require('../models/transaction/UserAudit.js')(sequelize, Sequelize);

db.LogMessage = require('../models/transaction/LogMessage.js')(sequelize, Sequelize);
db.UserProfile = require('../models/transaction/UserProfile.js')(sequelize, Sequelize);
db.question = require('../models/transaction/Question.js')(sequelize, Sequelize);
db.feedback = require('../models/transaction/Feedback.js')(sequelize, Sequelize);

//Relations

//Feedback
db.feedback.belongsTo(db.question, { foreignKey: 'question_id' });
db.question.hasOne(db.feedback, { foreignKey: 'question_id' });

db.feedback.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasOne(db.feedback, { foreignKey: 'user_id' });

//Question
db.question.belongsTo(db.eventsessions_mst, { foreignKey: 'event_session_id' });
db.eventsessions_mst.hasOne(db.question, { foreignKey: 'event_session_id' });

db.question.belongsTo(db.questionstatus_mst, { foreignKey: 'question_status_id' });
db.questionstatus_mst.hasOne(db.question, { foreignKey: 'question_status_id' });

db.question.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasOne(db.question, { foreignKey: 'user_id' });

//Event sessions
db.eventsessions_mst.belongsTo(db.event_mst, { foreignKey: 'event_id' });
db.event_mst.hasOne(db.eventsessions_mst, { foreignKey: 'event_id' });

db.eventsessions_mst.belongsTo(db.orator_mst, { foreignKey: 'orator_id' });
db.orator_mst.hasOne(db.eventsessions_mst, { foreignKey: 'orator_id' });

//Event
db.event_mst.belongsTo(db.eventtype_mst, { foreignKey: 'event_type_id' });
db.eventtype_mst.hasOne(db.event_mst, { foreignKey: 'event_type_id' });

db.event_mst.belongsTo(db.venue_mst, { foreignKey: 'venue_id' });
db.venue_mst.hasOne(db.event_mst, { foreignKey: 'venue_id' });

//Client
db.Client.belongsTo(db.BusinessDomain, { foreignKey: 'business_domain_id' });
db.BusinessDomain.hasOne(db.Client, { foreignKey: 'business_domain_id' });


db.Client.belongsTo(db.Country, { foreignKey: 'country_id' });
db.Country.hasOne(db.Client, { foreignKey: 'country_id' });

db.Client.belongsTo(db.State, { foreignKey: 'state_id' });
db.State.hasOne(db.Client, { foreignKey: 'state_id' });

db.Client.belongsTo(db.City, { foreignKey: 'city_id' });
db.City.hasOne(db.Client, { foreignKey: 'city_id' });

//User
db.User.belongsTo(db.UserRole, { foreignKey: 'user_role_id' });
db.UserRole.hasOne(db.User, { foreignKey: 'user_role_id' });

db.User.belongsTo(db.Status, { foreignKey: 'status_id' });
db.Status.hasOne(db.User, { foreignKey: 'status_id' });

// User_Info
db.UserContactDetail.belongsTo(db.Country, { foreignKey: 'country_id' });
db.Country.hasOne(db.UserContactDetail, { foreignKey: 'country_id' });

db.UserContactDetail.belongsTo(db.State, { foreignKey: 'state_id' });
db.State.hasOne(db.UserContactDetail, { foreignKey: 'state_id' });

db.UserContactDetail.belongsTo(db.City, { foreignKey: 'city_id' });
db.City.hasOne(db.UserContactDetail, { foreignKey: 'city_id' });

db.UserContactDetail.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasOne(db.UserContactDetail, { foreignKey: 'user_id' });

db.UserProfile.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasOne(db.UserProfile, { foreignKey: 'user_id' });


//User_Profile
/*
db.UserProfile.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasOne(db.UserProfile, { foreignKey: 'user_id' });

db.UserProfile.belongsTo(db.Affiliation, { foreignKey: 'affiliation_id' });
db.Affiliation.hasOne(db.UserProfile, { foreignKey: 'affiliation_id' });

db.UserProfile.belongsTo(db.Stream, { foreignKey: 'stream_id' });
db.Stream.hasOne(db.UserProfile, { foreignKey: 'stream_id' });

db.UserProfile.belongsTo(db.Designation, { foreignKey: 'designation_id' });
db.Designation.hasOne(db.UserProfile, { foreignKey: 'designation_id' });

db.UserProfile.belongsTo(db.Qualification, { foreignKey: 'qualification_id' });
db.Qualification.hasOne(db.UserProfile, { foreignKey: 'qualification_id' });
*/

db.sequelize.sync();
module.exports = db;
