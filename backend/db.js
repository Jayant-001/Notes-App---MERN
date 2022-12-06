const express = require('express')
const mongoose = require('mongoose')

MONGO_URI = 'mongodb://127.0.0.1:27017/datos';

// const connectToMonoose = () => {
//     mongoose.connect(MONGO_URI, (error) => {
//         console.log("connected to mongo db")
//         // if(error)
//         //     console.log("Error: ", error)
//     }).catch(error => console.log("Error-> ", error))
// }

const connectToMonoose = () => {
    mongoose.connect(MONGO_URI).
    then(() => console.log("Db connected")).
    catch((error) => console.log(error))
}

module.exports = connectToMonoose