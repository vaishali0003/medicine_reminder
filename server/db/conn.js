// const dotenv=require('dotenv');
const mongoose=require('mongoose');

const mongoURI='mongodb://localhost:27017/med_reminder';

mongoose.connect(mongoURI).then(()=>{
    console.log('database connected ');
}).catch((err)=>{
console.log('database not connected');
})