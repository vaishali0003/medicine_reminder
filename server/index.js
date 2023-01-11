const express=require('express')
require('./db/conn')
require('dotenv').config();
const reminder=require('./router/reminder')
const app=express();
var cors=require('cors');

app.use(cors());
app.use(express.json());

const port=process.env.port||9000;

app.use('/reminder',reminder)

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})