const nodemailer = require('nodemailer');
const config = require('../config.json');

module.exports.sendMail = async (to, subject, body, html = false) => {
  const transporter = nodemailer.createTransport(config.emailClient.clientConfig);
  const mailContent = {
    from: config.emailClient.from,
    to: to,
    subject: subject
  }

  if(html) {
    mailContent.html = body;
  } else {
    mailContent.text = body;
  }

  return transporter.sendMail(mailContent);
}