const { db } = require('../config/firebase-config');

const blogCollectionRef = db.collection('cms');
const postsCollectionRef = db.collection('posts');

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

const allPosts = async (req, res, next) => {
  try {
    const postsRef = await postsCollectionRef.orderBy('date', 'asc').get();

    const data = {
      posts: [],
    };

    postsRef.forEach((post) => {
      data.posts.push(post.data());
    });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const postDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const postsRef = await postsCollectionRef?.doc(id).get();

    const data = postsRef.data();

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  navigation,
  about,
  slider,
  allPosts,
  postDetails,
};
