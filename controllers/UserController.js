const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel')


exports.getAllUsers = async (req, res, next) => {
    try {

        let User = await UserModel.find({}, function (error, User) {
            if (error) console.log(error);
            res.json(User);
        }).clone();
    } catch (err) {
        next(err)
    }
}

exports.getUser = async (req, res, next) => {
    try {

        let user = await UserModel.findById({ _id: req.params.id }, function (error, user) {
            if (error) console.log(error);
            res.json(user);
        }).clone();
    } catch (err) {
        next(err)
    }
}
exports.addUser = async (req, res, next) => {
    try {
        const userexist = await UserModel.exists({ email: req.body.email })

        if (userexist)
            return res.status(401).json({
                message: "user already exist"
            })

        const DataUser = new UserModel(req.body);
        
        DataUser.hashpassword = bcrypt.hashSync(DataUser.hashpassword, 12);

        DataUser.save((err, user) => {
            if (err) {
                console.error(err);
                res.send({ message: "ERROR could not add user to DB", user })
            }
            console.log({ message: "user created !!", user })
            res.send({ message: "user created !!", user })
        })
    } catch (err) {
        next(err)
    }
}
exports.updateUser = async (req, res, next) => {
    try {
        console.log(req.body)

        let User = await UserModel.findById(req.params.id, (error, User) => {
            if (error) console.log(error);
            User = Object.assign(User, req.body).save((error, UserUpdated) => {
                if (error) console.error(error);
                res.json(UserUpdated);
            })
        }).clone();
    } catch (err) {
        next(err)
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        let User = await UserModel.findByIdAndDelete(req.params.id, (error, User) => {
            console.log(User)
            console.log(User._id)
            let Song = SongModel.deleteMany({ artist: User._id })
            if (error) console.log(error);
            res.json({
                message: "user deleted succesfully"
            });
        }).clone();
    } catch (err) {
        next(err)
    }
}