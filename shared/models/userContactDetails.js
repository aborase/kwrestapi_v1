class UserContactDetails {
    constructor(usercontactid, userid, address, countryid, countryother, stateid,stateother,
        cityid,cityother, pincode){
            this.usercontactid = usercontactid;
            this.userid =userid;
            this.address =address;
            this.countryid =countryid;
            this.countryother =countryother;
            this.stateid =stateid;
            this.stateother = stateother;
            this.cityid =cityid;
            this.cityother =cityother;
            this.pincode =pincode;

    }

}

module.exports = UserContactDetails;
