const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  //   host: 'smtp.gmail.com',
  //   port: 587,
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

const contact = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const msg = req.body.msg;

  const mail = {
    from: {
      name: firstName + ' ' + lastName,
      address: email,
    },
    to: process.env.EMAIL,
    subject: 'Contact form',
    text: msg,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail',
      });
    } else {
      res.json({
        status: 'success',
      });
    }
  });
};

const subscription = (req, res, next) => {
  const subscriptions = req.body.subscriptions;
  console.log(subscriptions);
  const postTitle = req.body.title;

  const mail = {
    from: '"Blog"',
    to: 'Writemailhere@kot.com',
    subject: 'New post added',
    text: `A new post titled "${postTitle}" has been added to our site.`,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail',
      });
    } else {
      res.json({
        status: 'success',
      });
    }
  });
};

module.exports = { contact, subscription };
