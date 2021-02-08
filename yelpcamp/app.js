const express=require("express");
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const Cluster=require('./models/cluster');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const app=express();
app.set("view engine",'ejs');
const path=require('path');
app.set('views',path.join(__dirname,'views'))
app.get("/",(req,res)=>{
    res.render('home');
})

app.get('/makecluster', async (req, res) => {
    const points = new Cluster({ title: 'My Backyard', description: 'cheap camping!' });
    await points.save();
    res.send(points)
})



app.listen(3000,()=>{
    console.log("serving on 3000");
})