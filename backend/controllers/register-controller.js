var db = require('../routes/conn');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12

//Controller responsible for registration
module.exports.register = function(req, res) {

    //bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS)

    //Registration form information
    bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hash => {
            var users = {
                "id": uuidv4(),
                "email": req.body.email, 
                "password": hash,
                "nickname": req.body.nickname,
                "residence": req.body.residence,
                "phone": req.body.phone
            }
        
    //Verify information
    //console.log("Users to register: ", users);

    //Database query to insert user
    db.query('INSERT INTO user SET?', users, function(error, results, fields){
        if(error) {
            res.json({
                status:false, 
                message: 'There are some error with query'
            })
        } else {
            res.json({
                status:true, 
                data:results,
                message:'User registered sucessfully'
            })
        }
    });
  })
}
