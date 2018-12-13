'use strict';

exports.allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
         if(!(accessLevel & req.user.user_role_id)) {
            res.sendStatus(403);
            return;
        }

        callback(req, res);
    }

    return checkUserRole;
};

exports.allowAll = function(callback) {
    function allowAll(req, res) {
        callback(req, res);
    }

    return allowAll;
};
