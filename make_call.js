// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

const VoiceResponse = require('twilio').twiml.VoiceResponse;


const accountSid = 'xxxx';  
const authToken = 'xxxx';
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

	  
// 
//
//12029331372
//http://3.87.188.18:8855/