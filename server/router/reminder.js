const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken); 
const Reminder = require('../models/reminderSchema');

// get all reminders
router.get('/getAllReminder', async(req, res) => {
try{
const reminders=await Reminder.find({});
res.json(reminders);
}
catch(err){
    console.log(err.message);
    res.status(500).send("Internal Server Error");
}
})

router.post('/addReminder',
    body('remind_msg','Enter a valid reminder').isLength({ min: 3 }),
    async (req, res) => {
        try {
            const { remind_msg, remind_at,is_remided,liquidType} = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const reminder = new Reminder({
                reminderMsg: remind_msg,
                remindAt: remind_at,
                isReminded:is_remided,
                liquidType:liquidType
            });

            console.log(reminder);

            const saveReminder = await reminder.save();
            res.json(saveReminder);
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send("Internal Server Error");
        }
    },
);

// delete a reminder
router.delete('/deleteReminder/:id', async(req, res) => {
try{
    let reminder=await Reminder.findById(req.params.id);
    if(!reminder){
        return res.status(404).json({message:"Not found"});
    }

    reminder=await Reminder.findByIdAndDelete(req.params.id);
    res.json({message:"reminder deleted",reminder:reminder});
}
catch(err){
    res.status(500).send("Internal server error");
}
})

router.get('/getstatus/:id',async(req,res)=>{
    try{
    let status=await Reminder.findById(req.params.id);
    res.json(status.isReminded);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
})

setInterval(async() => {
    try{
        const reminderList=await Reminder.find({});

        reminderList.forEach((reminder)=>{
            if(!reminder.isReminded){
             const now=new Date();

             if((new Date(reminder.remindAt)-now)<0){
                Reminder.findByIdAndUpdate(reminder._id,{isReminded:true},(err,remindObj)=>{
                    if(err){
                        console.log(err);
                    }
                    const accountSid = process.env.ACCOUNT_SID; 
                    const authToken = process.env.AUTH_TOKEN;
                    const client=require('twilio')(accountSid, authToken); 
                            client.messages 
                                .create({ 
                                    body: reminder.reminderMsg, 
                                    from: 'whatsapp:+14155238886',       
                                    to: 'whatsapp:+919174298434' 
                                }) 
                                .then(message => console.log(message.sid)) 
                                .done()
                        })
             }
            }
        })
    }
    catch(err){
        console.log('some internal error occured');
    }
    
}, 1000);

module.exports = router;















