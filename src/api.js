const express = require("express");
let bodyParser = require("body-parser");
const ExcelHandler = require("./excelUtil.js");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const accountSid = "xxxx";
const authToken = "xxxx";
const client = require("twilio")(accountSid, authToken);

const app = express();

const port = 8855;

let candidateList = new ExcelHandler("Data.xlsx").candidateDetails;
let questions = new ExcelHandler("Data.xlsx").getQuestions();
console.log(questions.length);
console.log(JSON.stringify(candidateList));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Handles when questions are completed

app.post("/exit/", (req, res) => {
  let response = new VoiceResponse();
  console.log(JSON.stringify(req.body));
  response.say("Ok we got your response, thanks for your time");
  res.type("text/xml");
  res.send(response.toString());
});

app.post("/question/", (req, res) => {
  console.log(req.body);
  let response = new VoiceResponse();
  console.log(req.query.questionIndex);
  console.log(parseInt(req.query.questionIndex) != 0);
  console.log(parseInt(req.query.questionIndex) == questions.length);

  if (parseInt(req.query.questionIndex) == questions.length) {
    response.redirect({ method: "POST" }, "http://18.212.20.107:8855/exit");
    res.send(response.toString());
    return;
  }

  if (parseInt(req.query.questionIndex) != 0) response.say("OK, your answer has been recorded");

  let url = "/question/?questionIndex=" + (parseInt(req.query.questionIndex) + 1) + "&candidateIndex=" + req.query.candidateIndex;

  let gather = response.gather({ input: "speech", action: url, method: "post", language: "en-IN", speechTimeout: "auto", enhanced: "true" });
  gather.say(questions[parseInt(req.query.questionIndex)].toString());

  res.send(gather.toString());
});

app.get("/welcome", (req, res) => {
  let localResponse = new VoiceResponse();
  localResponse.say("Hi");

  let candidateIndex;

  if (!req.query.candidateIndex || req.query.candidateIndex == 0) candidateIndex = 0;
  else candidateIndex = req.query.candidateIndex;

  let url = "http://18.212.20.107:8855/question/?questionIndex=0&candidateIndex=" + candidateIndex;

  let gather = localResponse.gather({
    input: "speech",
    action: url,
    method: "POST",
    hints: "yes,okay,sure,for sure,go ahead",
    language: "en-IN",
    speechTimeout: "auto",
    enhanced: "true",
  });
  gather.say(
    "Hi, This is HR assistant from T-systems, we have shortlisted your profile for Java developer role & need few details of you. Should we start with the set of questions ?",
  );
  localResponse.say("We didn't receive any input. Goodbye!");
  client.calls
    .create({
      twiml: localResponse.toString(),
      to: candidateList[0].Contact.toString(),
      from: "+12512502497",
    })
    .then(
      (call) => res.send(call.sid),
      (error) => res.send(error),
    );
});

app.get("/", (req, res) => console.log("I am getting called"));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//response.redirect({method:"post"},'/question/ok?pol=v');
