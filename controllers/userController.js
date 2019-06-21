const User = require('./../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
module.exports = {

    test:(req,res,next)=>{ 
       return  res.send('Working Test')
    }, 

    //Public Access
    registerUser: (req, res, next) => {
         
        User.findOne({email:req.body.email})
        .then(_user=>{
            if(_user){
                return res.status(400).json({email:'Email already exists'})
            }else{
                 
                //hashing the password
                bcrypt.genSalt(10,(err, salt)=>{
                    bcrypt.hash(req.body.password, salt,(err, hash)=>{
                        if(err) throw err;
                        req.body.password = hash; 
                        req.body.provider_pic = avatar
                new User(req.body).save()
                    .then(newUser => { 
                        return   res.json(newUser)
                    })
                    .catch(err=>console.log('err',err))
                    })
                })
                 
                
            }
        })
        .catch(err=>console.log('error:',err ))
         
    },

    //public Access
    loginUser: (req, res, next) => { 
        const { errors, isValid } = validateLoginInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

        const email = req.body.email;
        const password = req.body.password +"" ;
    //Find user by email 
        User.findOne({email })
        .then(_user=> {
            //check user
            if(!_user){
                return res.status(404).json({email:'User not found'});
            } else{
                bcrypt.compare(password,_user.password)
                .then(_isMatch=>{
                    if(_isMatch){
                        //Token assigning
                        const payload ={id:_user.id,name:_user.name,provider_pic:_user.provider_pic,email:_user.email, date:_user.date}
                         
                        jwt.sign(
                            payload,
                            config.secretOrKey,
                            {expiresIn:config.expiresIn},
                            (err,token)=>{
                                res.json({
                                    token:'Bearer ' + token
                                })
                            })
                    } else{
                        return res.status(400).json({password:'Password incorrect'})
                    }
                })
                .catch(_err=>console.log('_err',_err))
            }    
        })
        .catch(err=>console.log('err:',err))
    },
 
     
    getCurrentUser:(req, res, next)=>{
        res.json({
            id:req.user.id,
            name:req.user.name,
            email:req.user.email
        })
    }
    
}       