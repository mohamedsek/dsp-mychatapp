const MessagesModel = require('../models/MessagesModel')

exports.getMessages = async () => {
    try {

        let Messages = await MessagesModel.find({}, function (error, Messages) {
            if (error) console.log(error);
            console.log('at controller execution'+Messages)
            
        }).clone()
        return Messages;
    } catch (err) {
        console.log("couldn't get messages from db", err)
    }
}


exports.saveMessage = async (msg) => {
    try {
        const newMessage = new MessageModel(msg);
        newMessage.save((err, Message) => {
            if (err) {
                console.error(err);
            }
            console.log({ message: "Message created !!", Message })
        })
    } catch (err) {
        console.log("could not save to db")
    }
}