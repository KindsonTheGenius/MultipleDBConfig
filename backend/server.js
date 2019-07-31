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
  const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  sendRequestEmail(data.email, data, ip);
  res.send(true);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = 8111;
app.listen(port, () => console.log(`Server listening on port ${port}!`));

function sendRequestEmail(email, data, ip) {
  const id = getId();
  data.hasComment = (!!data.comment).toString();
  data.smsNotification = (!!data.smsNotification).toString();
  data.ipAddress = ip;
  data.id = id;

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
        "Email": "kontakt@jl-clean.de",
        "Name": "JL-Clean"
      }
    ],
    "TemplateID": 685195,
    "TemplateLanguage": true,
    "Subject": `Terminbestätigung zur Teppichabholung [Auftragnr. ${id}]`,
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

function getId() {
  const d = new Date();
  const dateStr = `${d.getFullYear()}${d.getMonth()+1}${d.getDate()}`;
  return `${dateStr}-${getRandom()}`;
}

function getRandom() {
  const length = 4;
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
