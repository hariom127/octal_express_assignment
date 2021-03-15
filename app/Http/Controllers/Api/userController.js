const User = require('../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
var helpers = require("../../../helper/helper");

/**
 * Controller userController
 * @package App\Http\Controllers
 * @version March 14, 2021, 10:30 pm IST
*/

function userController() {
    return {

        /**
         * param http get req
         * @return \Http\Json-Response
        */
        async index(req, res) {
            const decoded = helpers.getRequestToken(req.headers.authorization);
            
            const users = await User.find({
                'email': { $ne:  decoded.username}
            });
            return res.send({users}); //json
        },

        /**
         * param http post req
         * @return \Http\Json-Response\User
        */
        async signup(req, res) {
            
            const {username,first_name, last_name,email,phone,password} = req.body;
            //--------hash password----
            /*
            -> npm i bcrypt
            */
            const hasedPassword = await bcrypt.hash(password, 10);


            //---------create user------
            const user = new User({
                username, 
                first_name,   //can use one for same key:value
                last_name, 
                email,
                phone,
                password:hasedPassword,
            });

            user.save().then((user) => {
                return res.json({"message":"signup success"}); //json

            }).catch(err => {
                console.log(err);
                return res.json('Something went wrong'); //json
            })
        },


       /**
         * param http post req
         * @return \Http\Json-Response
         * token
        */
        async login(req, res) {
            const {email,password} = req.body;

            //-check if email exists------
            const user = await User.findOne({email:email})
            if(!user){
                return res.json({message:'User not found with this email!'})
            }
            bcrypt.compare(password, user.password)
            .then(match => {
                if(match) {
                    const token = helpers.generateAccessToken({id:user.id,username: email });
                   
                    return res.json({message:'Logedin successfully', '_token': token})
                }
                return res.json({message:'Wrong username or password'})
            })
            .catch(err => {
                console.log(err);
                return res.json({message:'Something waint wrong!'})
            })
        },

        /**
         * param http get req
         * @return \Http\Json-Response
         * user
        */
        async profile(req, res) {
            const decoded = helpers.getRequestToken(req.headers.authorization);
            const users = await User.findOne({
                'email': { $eq:  decoded.username}
            });
            return res.send({users}); //json
        },

        /**
         * param http put req
         * @return \Http\Json-Response
         * 
        */
        async addAddress(req, res) {

            const decoded = helpers.getRequestToken(req.headers.authorization);
            const address = req.body;

            const users = await User.update(
                { _id: decoded.id },
                { $push: { address: address } }
             );
            return res.send({"message": "Address added successfully"}); //json
        },

        
    }
}

module.exports = userController