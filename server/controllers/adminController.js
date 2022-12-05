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

module.exports = {
  summary,
};
