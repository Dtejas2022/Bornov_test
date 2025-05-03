const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const notesRoutes = require('./routes/notes');
const PORT = process.env.PORT || 3000;
dotenv.config();
const app = express();
//cors middleware
app.use(cors());
//json middleware
app.use(express.json());

//route middleware
app.use('/api/notes', notesRoutes);


//mongoose connection
mongoose.connect(process.env.MONGO_URL,{
    // usenewuseNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('MongoDB connection error:', err);
});

app.get("/",(req,res)=>{
    res.send("hello")
});

app.listen(process.env.PORT || PORT, ()=>{
    console.log("running on 3000");
});