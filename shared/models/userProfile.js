class userProfile {
    constructor(userprrofileid, userid, affiliationid, streamid, qualificationid, designationid,specializationId,
         skipCount,configid, isComplete){
        this.userprrofileid = userprrofileid;
        this.userid = userid;
        this.affiliationid = affiliationid;
        this.streamid = streamid;
        this.qualificationid = qualificationid;
        this.designationid = designationid;
        this.specializationId = specializationId;
        this.skipCount = skipCount;
        this.isComplete = isComplete;
        this.configid = configid;

    }

}

module.exports = userProfile;
