const axios = require('axios')
const express = require('express')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
 
app.get('/users', async (req, res) => {

    const {data}= await axios.get("https://jsonplaceholder.typicode.com/users")
    try {
        console.log(data);
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)   
    }
})

app.get('/users/:id', async (req, res) => {

    const {data}= await axios.get("https://jsonplaceholder.typicode.com/users/"+req.params.id)
    try {
        console.log(data);
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)   
    }
})

app.post('/users', async (req, res) => {
    const newUser=req.body
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    const {data}= await axios.post("https://jsonplaceholder.typicode.com/users/", newUser)
    console.log(newUser);
    try {
        console.log(data);
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)   
    }
})

app.put('/users/:id', async (req, res) => {
    const updatedUser=req.body
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    const {data}= await axios.put("https://jsonplaceholder.typicode.com/users/"+req.params.id, updatedUser)
    try {
        console.log(data);
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)   
    }
})

app.delete('/users/:id', async (req, res) => {
    const {data}= await axios.delete("https://jsonplaceholder.typicode.com/users/"+req.params.id)
    try {
        console.log(data);
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)   
    }
})

app.get('/users/:id/posts', async (req, res) => {

    const {data}= await axios.get("https://jsonplaceholder.typicode.com/posts?userId="+req.params.id)
    try {
        console.log(data);
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)   
    }
})

app.get('/users/:id/albums', async (req, res) => {

    const {data}= await axios.get("https://jsonplaceholder.typicode.com/albums?userId="+req.params.id)
    try {
        console.log(data);
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)   
    }
})

app.get('/users/albums/photos',async (req,res)=>{
    const {data}= await axios.get("https://jsonplaceholder.typicode.com/users")
    try{
        let users=data;
        var finalResult=[];
        users.forEach(async user => {
            const {data}= await axios.get("https://jsonplaceholder.typicode.com/albums?userId="+user.id)
            try {
                let userAlbums=data;
                user.Albums=userAlbums;
                user.Albums.forEach(async (uAlb) => {
                    const {data}= await axios.get("https://jsonplaceholder.typicode.com/albums/"+uAlb.id+"/photos")
                    try {
                        let photosInAlb=data;
                        uAlb.Photos=photosInAlb;
                        user.Albums=uAlb;
                        //res.send(user)
                    } catch (error) {
                        console.log(error)
                        res.send(error)   
                    }
                });
                //res.send(finalResult);
                //finalResult.push(user);
            } catch (error) {
                console.log(error)
                res.send(error)   
            }
        });
        //console.log(finalResult);
        res.send(finalResult)
    }catch (error) {
        console.log(error)
        res.send(error)   
    }
})

app.listen(3000)