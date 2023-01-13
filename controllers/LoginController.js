const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
    try {
        let DataUser = req.body;
        console.log('this data received from req to Login controller ' + DataUser)
        let User = await UserModel.findOne({ email: DataUser.email });
        console.log(User)
        console.log('>>>>>>>>>>>this the request data : ' + DataUser.hashpassword)
        if (User && bcrypt.compareSync(DataUser.hashpassword, User.hashpassword)) {
        console.log('>>>>>>>>>>>>>>>this is the DB data' + User.hashpassword)

                token = jwt.sign({ email: User.email }, process.env.PRIVATE_KEY, { expiresIn: 60 * 60 })
                res.status(200).json({message: token, error: false});

        }else{
            res.status(401).json({message: 'user not found', error: true})
        }
    } catch (err) {
        next(err)
    }
}


exports.loginPage = async (req, res, next) => {
    try {
        res.sendFile('C:\\dev\\formation\\nodejs\\dsp-mychatapp\\public\\login.html').type('html')
    } catch (err) {

    }
}
