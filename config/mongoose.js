const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/nodejs_server');

const DB = mongoose.connection;

DB.on('connected',(err)=>{
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log('DB Connected !!');
});

module.exports = DB;