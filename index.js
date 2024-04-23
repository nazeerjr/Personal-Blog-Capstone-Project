import express from 'express';
import bodyParser from 'body-parser';



const app = express();
const port = 3000;

let postSubmitted=[];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    console.log(postSubmitted);
    res.render("index.ejs",{postSubmitted});
});

app.get("/create",(req,res)=>{
    res.render("create.ejs");
});

app.post("/create",(req,res)=>{
    res.render("create.ejs");
});


app.post("/submit",(req,res)=>{
    const pname = req.body["name"];
    const ptitle = req.body["title"];
    const ptext = req.body["text"];

    console.log(pname);

    const newPost= {
        fname:pname,
        ftitle:ptitle,
        ftext:ptext
    }
    postSubmitted.push(newPost);


    res.redirect("/");
});

app.get("/view",(req,res)=>{
    res.render("index.ejs",{postSubmitted});
});


app.get("/edit/:id",(req,res)=>{

    const postId = req.params.id;
    const postEdit = postSubmitted[postId];

    res.render("create.ejs",{postEdit,postId})
});

app.post("/edit/:id",(req,res)=>{

    const postId = req.params.id;
    postSubmitted[postId].fname= req.body.name;
    postSubmitted[postId].ftitle= req.body.title;
    postSubmitted[postId].ftext= req.body.text;


    res.redirect("/");
});
app.post("/delete/:id",(req,res)=>{
    const postId = req.params.id;

    postSubmitted.splice(postId,1);


    res.redirect("/");
});

app.listen(port,()=>{
    console.log(`Server started at port number ${port}`);
})