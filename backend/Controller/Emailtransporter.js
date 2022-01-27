const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sriaj711@gmail.com',
      pass: 'Ajay6569@'
    }
  });

  module.exports = transporter;