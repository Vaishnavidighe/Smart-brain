const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signIn');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db = knex({
  client: 'pg',
  connection: {
   connectionString: process.env.DATABASE_URL,
   ssl: true
  }
   // connection: {
  //   host : '127.0.0.1',
  //   user : 'postgres',
  //   password : 'Newuser@123',
  //   database : 'smartbrain'
  // }
});

const app= express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.send('it is working!')
})

app.post('/signin',(req,res)=>{ signin.handleSignin(req,res,db,bcrypt)});

app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res) =>{profile.handleProfileGet(req,res.db)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000,()=>{
	console.log('app is running');
})