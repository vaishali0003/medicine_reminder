const mongoose=require('mongoose');

const reminderSchema=mongoose.Schema({
    reminderMsg:{
        type:String
    },
    remindAt:{
        type:String
    },
    isReminded:{
        type:Boolean
    },
    liquidType:{
        type:String
    }
})

const Reminder=mongoose.model('reminder',reminderSchema);
module.exports=Reminder;
