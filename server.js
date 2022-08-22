let express = require('express')
let config =  require('./config.js') 
let Razorpay= require('razorpay')
var bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/' , (req,res)=>{
     res.status(200).send("home page ")
})


app.post('/pay' , (req,res) =>{

     const {amount} = req.body
      
    var instance = new Razorpay({ key_id: config.key_id ,  key_secret: config.key_secret })
    async function generateOrder(){
        let response = await instance.orders.create({
            amount: amount*100,
            currency: "INR",
            receipt: `receipt${Math.floor(Math.random()*Math.random()*1000)}`,
            notes: {
              key1: "value3",
              key2: "value2"
              } 
          })
           
          console.log("response" , response ); 
        res.status(200).send(response)  
    }
    generateOrder()

})
  
app.listen(4000, ()=>{
     console.log ("server running on port 4000 ")
})