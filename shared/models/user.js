class User {
  constructor(userid,clientid,userregistrationid,name,emailid,password,logintype,
    mobileno,profilephotopath,profilephoto,
    statusid,active,activefrom,deactivefrom,userroleid,gender, profile,contactdetails) {
      this.userid = userid;
      this.clientid =  clientid; 
      this.userregistrationid = userregistrationid;
      this.name = name;
      this.logintype = logintype;
      this.emailid = emailid;
      this.password = password;
      this.mobileno =mobileno;
      this.profilephotopath =profilephotopath;
      this.gender = gender;
      this.profilephoto =profilephoto;
      this.statusid =statusid;
      this.active =active
      this.activefrom = activefrom;
      this.deactivefrom =deactivefrom;
      this.userroleid  = userroleid;
      this.profile = profile;
      this.contactdetails = contactdetails;

  }
}


module.exports = User;



