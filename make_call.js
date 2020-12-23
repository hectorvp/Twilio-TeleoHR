// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

const VoiceResponse = require('twilio').twiml.VoiceResponse;


const accountSid = 'AC0e4dd8b1fe16a6f5834e39a37fbe8c0b';  
const authToken = 'ca1ef6a5b49a0190e4042de7e79f32fc';
const client = require('twilio')(accountSid, authToken);




const response = new VoiceResponse();
//response.say({voice:'alice',language:'en-IN'},'Hi, this HR virtual assistant from T-systems, we have shortlisted your candidature we need few details of you');
const gather = response.gather({
	input: 'speech',
	action: 'http://18.212.20.107:8855/response',
	method: 'POST',
	hints: 'yes,okay,sure,for sure,go ahead'
	
	
	
});
gather.say('Should we start with the set of questions ?');
response.say('We didn\'t receive any input. Goodbye!');





client.calls
      .create({
         twiml: response.toString(),
         to: '+917798627995',
         from: '+12512502497'
       })
      .then(call => console.log(call.sid),error => console.log(error));

	  
// AC498e493c9f3e9f81a594e67d035ba046
//c0ac7b696fd38c6f40db383b771693bc
//12029331372
//http://3.87.188.18:8855/