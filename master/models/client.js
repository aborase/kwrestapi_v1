class Client {
  constructor(	clientid, clientregistrationid, name, emailid, mobileno, address, 
    countryid, countryother, stateid, stateother, cityid, 
    cityother, pincode, websiteurl, contactnos, businessdomainid,
     businessdescription, clientlogopath, clientlogo, active){
       
      this.clientid = clientid;
      this.clientregistrationid = clientregistrationid ;
      this.name = name;
       this.emailid= emailid ; 
       this.mobileno= mobileno ; 
       this.address= address ; 
       this.countryid= countryid ; 
       this.countryother= countryother ; 
       this.stateid= stateid ; 
       this.stateother= stateother ;
       this.cityid= cityid ; 
       this.cityother= cityother ; 
       this.pincode= pincode ; 
       this.websiteurl= websiteurl ; 
       this.contactnos= contactnos ;
       this.businessdomainid= businessdomainid ;
       this.businessdescription= businessdescription ;
       this.clientlogopath= clientlogopath ;
       this.clientlogo= clientlogo ; 
       this.active = active
  }
}
module.exports = Client;


