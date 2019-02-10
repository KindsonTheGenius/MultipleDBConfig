const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const mailjet = require('node-mailjet')
  .connect('8a8a83e6aca52cee0b18e600b8723944', '80121b40c61f7b32d42ecba5ec0919a9');

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/send-request', (req, res) => {
  const data = req.body;
  sendRequestEmail(data.email, data);
  res.send(true);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = 8111;
app.listen(port, () => console.log(`Server listening on port ${port}!`));

function sendRequestEmail(email, data) {
  data.hasComment = (data.comment.length > 0).toString();
  //data.hasComment = "true";
  data.smsNotification = (!!data.smsNotification).toString();
  //data.smsNotification = "true";

  console.log(data.hasComment);
  console.log(data.smsNotification);
  const message = {
    "From": {
      "Email": "kontakt@jl-clean.de",
      "Name": "JL-Clean Team"
    },
    "To": [
      {
        "Email": email
      }
    ],
    "Bcc": [
      {
        "Email": "service@jl-clean.de",
        "Name": "JL-Clean"
      }
    ],
    "TemplateID": 685195,
    "TemplateLanguage": true,
    "Subject": 'Terminbestätigung zur Teppichabholung',
    "Variables": data
  };

  const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages": [message]
    });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.error(err);
    })
}
