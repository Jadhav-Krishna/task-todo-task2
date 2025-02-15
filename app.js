const dotenv = require("dotenv")
const express = require("express");
const path = require("path");
const app = express();
const taskModel = require("./models/task");
dotenv.config();

app.set("view engine","ejs");
app.use(express.json( ));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/read",(req,res) => {
    taskModel.find()
    .then((task)=>{ res.render("read",{task})
    })  
    .catch((err) => {
        res.send(err.message);
    })
})

app.post("/create",(req,res) => {
    let {taskDesc,taskTitle} = req.body;
    taskModel.create({
        taskTitle,
        taskDesc
    })
    .then( (data) =>{
        res.redirect("/read") 
    })
    .catch((err)=>{
    res.send(err.message);
})
})

app.get("/delete/:id",(req,res)=>{
    taskModel.findOneAndDelete({_id:req.params.id})
    .then((ress)=>{
        res.redirect('/read')
    })
    .catch(err => {
        res.send(err.message);
    })
})

app.get("/edit/:id", async(req,res) => {
    try{
       let task = await taskModel.findOne({_id:req.params.id})
       res.render('edit',{task})
    }
    catch(err){
        res.send(err.message)
    }
})

app.post('/update/:userid',async (req,res) => {
    try{
        let {taskDesc,taskTitle} = req.body;
        let userdets = await taskModel.findOneAndUpdate({_id:req.params.userid} , {taskDesc,taskTitle} , {new:true});
        res.redirect("/read");
    }
    catch(err){
        res.send(err.message)
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on http://localhost:"+PORT)
});