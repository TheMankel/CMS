const { db, firebase } = require('../config/firebase-config');

const auth = firebase.auth();
const usersCollectionRef = firebase.firestore().collection('users');

const signUp = async (req, res, next) => {
  try {
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

    // const test = await usersCollectionRef.where('email', '==', email).get();
    // console.log(test);

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
    // .cookie('access_token', token, {
    //   httpOnly: true,
    // })
    auth.setCustomUserClaims(uid, { admin: false });
    await db.collection('users').doc(uid).set(data);
    // await usersCollectionRef.doc(uid).set(data);
    // console.log('Added document with ID: ', res.id);

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { uid, email } = req.body;

    if (!email)
      return res.json({
        error: 'Email is required',
      });

    const usersRef = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    // const test = await usersCollectionRef.where('email', '==', email).get();
    // console.log(test);

    console.log(usersRef.empty);

    if (usersRef.empty)
      return res.json({
        error: 'No such user',
      });

    // .cookie('access_token', token, {
    //   httpOnly: true,
    // })

    const ref = await db.collection('users').doc(uid).get();
    const data = ref.data();
    // await usersCollectionRef.doc(uid).set(data);
    // console.log('Added document with ID: ', res.id);

    // const data = await usersRef.get();

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  signUp,
  signIn,
};
