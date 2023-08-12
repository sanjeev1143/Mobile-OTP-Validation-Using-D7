const express = require('express');
const app = express();
const axios = require('axios')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
let otpId="";

const sendOTPMessage = async()=>{
try {
    

    var data = JSON.stringify({
        "originator": "SignOTP",
        "recipient": "+917008680932",
        "content": "Hey, your mobile verification code is: {}",
        "expiry": "600",
        "data_coding": "text"
      });
      
      var config = {
        method: 'post',
        url: 'https://api.d7networks.com/verify/v1/otp/send-otp',
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiM2VmMWM5ZGItNDk0Ni00NzdjLTljNzktNzgzN2VkNjUxZDRhIn0.oLJhYqZK2l-ha3fH0avBaYcgk-8nUnJ8k9Kzy6hfQ6A', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      const response = await axios(config)
      console.log(response.data);
     
      return response.data.otp_id;

      
      
    } catch (error) {
        console.log(error);
    }  
}

const verifyOTPMessage=async(otp_id,otp_code)=>{
    
    try {

    var data = JSON.stringify({
        "otp_id": otp_id,
        "otp_code": otp_code
      });
      
      var config = {
        method: 'post',
        url: 'https://api.d7networks.com/verify/v1/otp/verify-otp',
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiM2VmMWM5ZGItNDk0Ni00NzdjLTljNzktNzgzN2VkNjUxZDRhIn0.oLJhYqZK2l-ha3fH0avBaYcgk-8nUnJ8k9Kzy6hfQ6A', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      const response = await axios(config)
      console.log(response.data);
     
      return response.data.otp_id;
      
             
    } catch (error) {
        return error;
    }
}


// sendOTPMessage()
// verifyOTPMessage()


app.post('/sendotp',(req,res)=>{
    otpId=sendOTPMessage();
    res.send("OTP Sent.")
})



app.post('/verifyotp',async(req,res)=>{
    const {otp} = req.body;
    const resp = await verifyOTPMessage(await otpId,Number(otp));
    res.send(resp)
})





app.get('/',(req,res)=>{
    res.send("Backend Is Live")
})


app.listen(8000,()=>{
    console.log("listening to the port number 8000");
}) 