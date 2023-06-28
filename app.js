const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


app.use(function(req, res, next) { 
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   next();
 });

 const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname));


app.use(cookieParser());


const myusername = 'Super'
const mypassword = '12345'


var session;

app.get('/',(req,res) => {
  if(req.session.user){
      res.redirect("/user")
  }else
  res.sendFile('views/index.html',{root:__dirname})
});

app.get('/user',(req,res)=>{
  if(req.session.user){
      res.send(`<a href=\'/logout'><button>Logout</button></a>`);
  }else{
    redirect("/")
  } 
})


app.post('/user',(req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){
      req.session.user=true;
      console.log(req.session)
      res.send(`<a href=\'/logout'><button>Logout</button></a>`);
  }
  else{
    req.session.user=false;
      res.send('Invalid username or password'); 
  }
})

app.get('/logout',(req,res)=> {
  req.session.user=false;
  req.session.destroy();
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));   