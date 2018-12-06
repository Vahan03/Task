//Class for making new User Object(mongodb)
module.exports = class UsersMongoObject{
  constructor(id,path){
    this.id = id;
    this.images = [];
    this.totalImages = 0;
  }
};
