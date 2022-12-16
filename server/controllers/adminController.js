const { firestore } = require('firebase-admin');
const { db } = require('../config/firebase-config');
const usersCollectionRef = db.collection('users');
const postsCollectionRef = db.collection('posts');
const categoriesCollectionRef = db.collection('categories');
const blogCollectionRef = db.collection('cms');

const summary = async (req, res, next) => {
  try {
    const postsRef = await postsCollectionRef.get();
    const categoriesRef = await categoriesCollectionRef.get();
    const usersRef = await usersCollectionRef.where('role', '==', 'user').get();

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

const newPost = async (req, res, next) => {
  try {
    const { description, image, text, title } = req.body;

    const date = new Date();

    const shortDate = date.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const data = {
      created: firestore.Timestamp.fromDate(date),
      date: shortDate,
      description: description,
      image: image,
      text: text,
      title: title,
    };

    const postTitle = title?.toLowerCase().replace(' ', '-');

    postsCollectionRef.doc(postTitle).set(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { description, image, text, title } = req.body;

    const data = {
      description: description,
      image: image,
      text: text,
      title: title,
    };

    const postTitle = title?.toLowerCase().replace(' ', '-');

    postsCollectionRef.doc(postTitle).update(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.body;
    console.log(id);

    const postRef = await postsCollectionRef.doc(id);
    postRef.delete();

    return res.status(200).json('Post deleted!');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateNameLogo = async (req, res, next) => {
  try {
    const { title, logo } = req.body;
    const fieldsRef = await blogCollectionRef.doc('public-navigation');

    const data = {
      title: title,
      logo: logo,
    };

    fieldsRef.update(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  summary,
  recentUsers,
  newPost,
  editPost,
  deletePost,
  updateNameLogo,
};
