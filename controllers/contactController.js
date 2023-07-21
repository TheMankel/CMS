const nodemailer = require('nodemailer');
const { firestore } = require('firebase-admin');
const { db } = require('../config/firebase-config');

const subscriptionCollectionRef = db.collection('subscription');

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

const subscription = async (req, res, next) => {
  try {
    const emailsRef = await subscriptionCollectionRef
      .orderBy('created', 'asc')
      .get();

    const data = {
      subscriptions: [],
    };

    emailsRef.forEach((subscriber) => {
      data.subscriptions.push(subscriber.data().email);
    });

    const emails = data;

    console.log(emails.subscriptions);

    const postTitle = req.body.title;

    emails.subscriptions.forEach((email) => {
      const mail = {
        from: '"Blog"',
        to: email,
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
    });

    return res.status(200).json('Mails sent to subscribers!');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = { contact, subscription };
