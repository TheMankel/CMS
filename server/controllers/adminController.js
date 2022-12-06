const { db } = require('../config/firebase-config');
const usersCollectionRef = db.collection('users');
const postsCollectionRef = db.collection('posts');
const categoriesCollectionRef = db.collection('categories');

const summary = async (req, res, next) => {
  try {
    const postsRef = await postsCollectionRef.get();
    const categoriesRef = await categoriesCollectionRef.get();
    const usersRef = await usersCollectionRef.get();

    const data = {
      posts: postsRef.size,
      categories: categoriesRef.size,
      users: usersRef.size,
    };

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const recentUsers = async (req, res, next) => {
  try {
    const today = new Date();
    const month = today.toLocaleString('en-US', { month: 'long' });
    const year = today.getFullYear();

    const date = new Date(`${month} 01, ${year}`);

    const usersRef = await usersCollectionRef
      .where('created', '>=', date.getTime())
      .orderBy('created', 'desc')
      .get();

    const data = [];

    usersRef.forEach((user) => {
      data.push({
        fullName: user.data().firstName + ' ' + user.data().lastName,
        created: new Date(user.data().created).toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      });
    });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  summary,
  recentUsers,
};
