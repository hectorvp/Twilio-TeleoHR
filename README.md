## Twilio-TeleoHR
Picks HR screening questions from xlsx, calls to candidate to ask those questions and stores responses. (Twilio-Node JS integration)

## How to run
Store your questions and  candidates info in Data.xlsx  
Sheet 1 contains candidate info  
Sheet 2 contains questions to be ased to candidates  
Sheet 3 must populate responses of a candidate(Currently not present in Data.xlsx)    

In make_call.js provide your twili accountSID and tokenId. And server's IP:Port where this node js will run  
In cmd run followin command  
node make_calls.js  



