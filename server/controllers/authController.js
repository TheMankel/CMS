const db = require('../config/firebase');

const signUp = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { uid, firstName, lastName, email } = req.body;

    if (!firstName)
      return res.json({
        error: 'First Name is required',
      });

    if (!lastName)
      return res.json({
        error: 'Last Name is required',
      });

    if (!email)
      return res.json({
        error: 'Email is required',
      });

    const usersRef = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    console.log(usersRef.empty);

    if (!usersRef.empty)
      return res.json({
        error: 'Email is taken',
      });

    const data = {
      firstName,
      lastName,
      email,
      role: 'user',
    };
    const res = await db.collection('users').doc(uid).set(data);
    // console.log('Added document with ID: ', res.id);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  signUp,
};
