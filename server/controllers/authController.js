const { db, firebase } = require('../config/firebase-config');

const auth = firebase.auth();
const usersCollectionRef = db.collection('users');
const blogCollectionRef = db.collection('cms');

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

    const usersRef = await usersCollectionRef.where('email', '==', email).get();

    console.log(usersRef.empty);

    if (!usersRef.empty)
      return res.json({
        error: 'Email is taken',
      });

    const data = {
      firstName,
      lastName,
      email,
    };

    const listUsersResult = await auth.listUsers(2);

    if (listUsersResult.users.length === 1) {
      await auth.setCustomUserClaims(uid, { admin: true });
      data.role = 'admin';
    } else {
      await auth.setCustomUserClaims(uid, { admin: false });
      data.role = 'user';
    }

    auth.updateUser(uid, {
      displayName: firstName + ' ' + lastName,
    });

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

const navigation = async (req, res, next) => {
  try {
    const categoriesRef = await blogCollectionRef
      .doc('public-navigation')
      .collection('categories')
      .get();

    const sectionsRef = await blogCollectionRef
      .doc('public-navigation')
      .collection('sections')
      .get();

    const fieldsRef = await blogCollectionRef.doc('public-navigation').get();

    const data = {
      categories: [],
      sections: [],
      title: fieldsRef.data().title,
      logo: fieldsRef.data().logo,
    };

    categoriesRef.forEach((cat) => {
      data.categories.push(cat.data());
    });

    sectionsRef.forEach((sec) => {
      data.sections.push(sec.data());
    });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const about = async (req, res, next) => {
  try {
    const storyRef = await blogCollectionRef
      .doc('about')
      .collection('story')
      .doc('text')
      .get();

    const teamRef = await blogCollectionRef
      .doc('about')
      .collection('team')
      .get();

    const data = {
      storyText: {
        primary: '',
        secondary: '',
      },
      team: [],
    };

    data.storyText = storyRef.data();

    teamRef.forEach((member) => {
      data.team.push(member.data());
    });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const slider = async (req, res, next) => {
  try {
    const sliderRef = await blogCollectionRef
      .doc('slider')
      .collection('carouselItems')
      .get();

    const data = {
      carouselItems: [],
    };

    sliderRef.forEach((item) => {
      data.carouselItems.push(item.data());
    });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  signUp,
  signIn,
  navigation,
  about,
  slider,
};
