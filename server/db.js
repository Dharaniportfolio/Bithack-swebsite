const  mongoose = require('mongoose');
require('dotenv').config();


async function getDatabase(){
    mongoose.connect(process.env.Mongo_URI,{ dbName: 'Bithack' })
    .then(()=>{
        console.log("Connected DB");
    })
    .catch(()=>{
        console.log("failed");
    })
}

module.exports = {getDatabase}