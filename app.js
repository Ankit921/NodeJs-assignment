require('dotenv').config();
const express=require('express');
const expressLayout=require('express-ejs-layouts');
const { flash } = require('express-flash-message');
const methodOverride=require('method-override');
const session = require('express-session');
const connectDB=require('./server/config/db');


const app=express();
const port=5500 || process.env.PORT;


//connect to db
connectDB();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static('public'));



app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',require('./server/routes/customer'))

app.get('*',(req,res)=>{
  res.status(404).render('404');
});

app.listen(port, ()=> {
  console.log(`App listeing on port ${port}`)
});