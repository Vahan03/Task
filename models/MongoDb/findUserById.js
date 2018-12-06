
//find user by id
module.exports = async (id,db)=>{
  const user = await db.findOne({
    id: `${id}`
  });
  return user;
}
