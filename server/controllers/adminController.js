const { db } = require('../config/firebase-config');
const usersCollectionRef = db.collection('users');

const summary = async (req, res, next) => {
  try {
    const usersRef = await usersCollectionRef.get();
    const count = usersRef.size;
    console.log(count);

    const data = {
      posts: '21',
      categories: '37',
      users: count,
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
