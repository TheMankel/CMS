const { db, firebase } = require('../config/firebase-config');

const auth = firebase.auth();
const usersCollectionRef = db.collection('users');

const signUp = async (req, res, next) => {
  try {
    const { uid, firstName, lastName, email, created } = req.body;

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

    const usersRef = await usersCollectionRef.where('email', '==', email).get();

    if (!usersRef.empty)
      return res.json({
        error: 'Email is taken',
      });

    const data = {
      firstName,
      lastName,
      email,
      created,
    };

    const listUsersResult = await auth.listUsers(2);

    if (listUsersResult.users.length === 1) {
      await auth.setCustomUserClaims(uid, { admin: true });
      data.role = 'admin';
    } else {
      await auth.setCustomUserClaims(uid, { admin: false });
      data.role = 'user';
    }

    await usersCollectionRef.doc(uid).set(data);

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

    const usersRef = await usersCollectionRef.where('email', '==', email).get();

    console.log(usersRef.empty);

    if (usersRef.empty)
      return res.json({
        error: 'No such user',
      });

    const ref = await usersCollectionRef.doc(uid).get();
    const data = ref.data();

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { uid } = req.body;

    const usersRef = usersCollectionRef.doc(uid);

    usersRef.delete();

    return res.status(200).json('User data deleted!');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateUserPhoto = async (req, res, next) => {
  try {
    const { uid, photoURL } = req.body;

    const usersRef = usersCollectionRef.doc(uid);
    usersRef.update({
      photoURL: photoURL,
    });

    return res.status(200).json('User picture updated!');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  signUp,
  signIn,
  deleteUser,
  updateUserPhoto,
};
