const { db } = require('../config/firebase-config');

const usersCollectionRef = db.collection('users');
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
    const usersRef = await usersCollectionRef.get();

    const data = postsRef.data();
    const usersData = [];
    const comments = data.comments;
    const commentsData = [];

    usersRef.forEach((user) => {
      usersData.push({
        id: user.id,
        ...user.data(),
      });
    });

    comments.forEach((comment) => {
      const userComment = usersData.find((user) => user.id === comment.uid);
      if (!userComment) return;

      commentsData.push({
        fullName: userComment.firstName + ' ' + userComment.lastName,
        avatar: userComment.photoURL,
        ...comment,
      });
    });

    data.comments = commentsData;

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const comment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const postRef = postsCollectionRef?.doc(id);
    const getPost = await postRef.get();
    const { comments } = getPost.data();

    comments.push(data);

    await postRef.update({
      comments: comments,
    });

    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const pinnedPosts = async (req, res, next) => {
  try {
    const pinnedPostsRef = await blogCollectionRef.doc('pinned-posts').get();
    const { firstPost, secondPost } = pinnedPostsRef.data();
    const data = [];

    const firstPostRef = await postsCollectionRef
      ?.doc(firstPost.toLowerCase().replace(' ', '-'))
      ?.get();

    const secondPostRef = await postsCollectionRef
      ?.doc(secondPost.toLowerCase().replace(' ', '-'))
      ?.get();

    const firstPostData = firstPostRef.data();
    const secondPostData = secondPostRef.data();

    if (firstPostData) data.push(firstPostData);
    if (secondPostData) data.push(secondPostData);

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const archives = async (req, res, next) => {
  try {
    const postsRef = await postsCollectionRef.orderBy('date', 'desc').get();

    const dates = [];

    postsRef.forEach((post) => {
      const postData = post.data();
      const string = postData.date.split(' ');
      const date = string[0] + ' ' + string[2];

      if (!dates.includes(date))
        dates.push({
          title: date,
        });
    });

    return res.status(200).json(dates);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const archivesPosts = async (req, res, next) => {
  try {
    const { yearId, monthId } = req.params;
    console.log(yearId, monthId);
    const postsRef = await postsCollectionRef.orderBy('date', 'asc').get();

    const data = {
      posts: [],
    };

    postsRef.forEach((post) => {
      const postData = post.data();
      const words = [yearId, monthId];
      const cos = words.every((word) =>
        postData.date.toLowerCase().includes(word),
      );
      console.log(cos);
      if (cos) data.posts.push(postData);
    });

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
  comment,
  pinnedPosts,
  archives,
  archivesPosts,
};
