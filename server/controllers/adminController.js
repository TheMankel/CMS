const { firestore } = require('firebase-admin');
const { db, firebase } = require('../config/firebase-config');

const auth = firebase.auth();
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
      comments: [],
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

    const postRef = postsCollectionRef.doc(id);
    postRef.delete();

    return res.status(200).json('Post deleted!');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { title, logo } = req.body;
    // const blogRef = blogCollectionRef.doc('public-navigation');
    const blogRef = blogCollectionRef.doc('blog');

    const data = {
      title: title,
      logo: logo,
    };

    await blogRef.update(data);

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updatePolicy = async (req, res, next) => {
  try {
    const content = req.body;
    const policyRef = blogCollectionRef.doc('privacy-policy');

    const data = {
      content: content,
    };

    policyRef.update(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updatePinnedPosts = async (req, res, next) => {
  try {
    const { firstPost, secondPost } = req.body;
    const pinnedPostsRef = blogCollectionRef.doc('pinned-posts');

    const data = {
      firstPost: firstPost,
      secondPost: secondPost,
    };

    pinnedPostsRef.update(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const sliderRef = blogCollectionRef
      .doc('slider')
      .collection('carouselItems')
      .doc(id);

    await sliderRef.update(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const users = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usersRef = await usersCollectionRef.get();
    const usersData = [];

    usersRef.forEach((user) => {
      if (user.id !== id) {
        const data = user.data();

        usersData.push({
          uid: user.id,
          fullName: data.firstName + ' ' + data.lastName,
          created: new Date(data.created).toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          email: data.email,
          role: data.role,
        });
      }
    });

    return res.status(200).json(usersData);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await usersCollectionRef.doc(id).update({
      role: data.role === 'admin' ? 'user' : 'admin',
    });
    await auth.setCustomUserClaims(id, {
      admin: data.role === 'admin' ? false : true,
    });

    return res.status(200).json('User role updated');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await usersCollectionRef.doc(id).delete();
    await auth.deleteUser(id);

    return res.status(200).json('User deleted');
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
  updateBlog,
  updatePolicy,
  updatePinnedPosts,
  updateSlider,
  users,
  updateUser,
  deleteUser,
};
