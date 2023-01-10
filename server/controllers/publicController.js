const { firestore } = require('firebase-admin');
const { db } = require('../config/firebase-config');

const categoriesCollectionRef = db.collection('categories');
const blogCollectionRef = db.collection('cms');
const postsCollectionRef = db.collection('posts');
const usersCollectionRef = db.collection('users');
const subscriptionCollectionRef = db.collection('subscription');

// const navigation = async (req, res, next) => {
//   try {
//     const categoriesRef = await blogCollectionRef
//       .doc('public-navigation')
//       .collection('categories')
//       .get();

//     const sectionsRef = await blogCollectionRef
//       .doc('public-navigation')
//       .collection('sections')
//       .get();

//     const fieldsRef = await blogCollectionRef.doc('public-navigation').get();

//     const data = {
//       categories: [],
//       sections: [],
//       title: fieldsRef.data().title,
//       logo: fieldsRef.data().logo,
//     };

//     categoriesRef.forEach((cat) => {
//       data.categories.push(cat.data());
//     });

//     sectionsRef.forEach((sec) => {
//       data.sections.push(sec.data());
//     });

//     return res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(400);
//   }
// };

const blog = async (req, res, next) => {
  try {
    const blogRef = await blogCollectionRef.doc('blog').get();
    const data = blogRef.data();

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const about = async (req, res, next) => {
  try {
    // const storyRef = await blogCollectionRef
    //   .doc('about')
    //   .collection('story')
    //   .doc('text')
    //   .get();

    const aboutRef = blogCollectionRef.doc('about');
    const storyRef = await aboutRef.get();
    const teamRef = await aboutRef
      .collection('team')
      .orderBy('created', 'asc')
      .get();
    const storyData = storyRef.data();

    // const teamRef = await blogCollectionRef
    //   .doc('about')
    //   .collection('team')
    //   .get();

    const data = {
      // storyText: {
      //   primary: '',
      //   secondary: '',
      // },
      story: storyData.story,
      team: [],
    };

    // data.storyText = storyRef.data();

    teamRef.forEach((member) => {
      data.team.push({ ...member.data(), id: member.id });
    });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const contact = async (req, res, next) => {
  try {
    const contactRef = await blogCollectionRef.doc('contact').get();
    const data = contactRef.data();

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateSubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    const date = new Date();

    const data = {
      created: firestore.Timestamp.fromDate(date),
      email,
    };

    await subscriptionCollectionRef.add(data);

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

    const data = [];

    sliderRef.forEach((item) => {
      data.push(item.data());
    });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const allPosts = async (req, res, next) => {
  try {
    const postsRef = await postsCollectionRef.orderBy('created', 'desc').get();

    const data = [];

    postsRef.forEach((post) => {
      data.push(post.data());
    });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const recentPost = async (req, res, next) => {
  try {
    const postsRef = await postsCollectionRef.orderBy('created', 'asc').get();

    const data = [];

    postsRef.forEach((post) => {
      data.push(post.data());
    });

    return res.status(200).json(data.pop());
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

const addComment = async (req, res, next) => {
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
      ?.doc(firstPost.toLowerCase().replaceAll(' ', '-'))
      ?.get();

    const secondPostRef = await postsCollectionRef
      ?.doc(secondPost.toLowerCase().replaceAll(' ', '-'))
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
    const postsRef = await postsCollectionRef.orderBy('created', 'desc').get();

    const dates = [];

    postsRef.forEach((post) => {
      const postData = post.data();
      const string = postData.date.split(' ');
      const date = string[0] + ' ' + string[2];

      // if (!dates.includes(date)) {
      //   console.log(item);
      //   dates.push({
      //     title: date,
      //   });
      // }
      const isDuplicate = dates.some((item) => item.title === date);

      if (!isDuplicate)
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

    const postsRef = await postsCollectionRef.orderBy('created', 'desc').get();

    const data = [];

    postsRef.forEach((post) => {
      const postData = post.data();
      const words = [yearId, monthId];
      const condition = words.every((word) =>
        postData.date.toLowerCase().includes(word),
      );

      if (condition) data.push(postData);
    });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const privacyPolicy = async (req, res, next) => {
  try {
    // const privacyRef = await blogCollectionRef
    //   .doc('privacy-policy')
    //   .collection('content')
    //   .get();

    // const data = {
    //   content: [],
    // };

    // privacyRef.forEach((rule) => {
    //   data.content.push(rule.data());
    // });

    const privacyRef = blogCollectionRef.doc('privacy-policy');
    const contentRef = await privacyRef
      .collection('content')
      .orderBy('created', 'asc')
      .get();
    const fieldsRef = await privacyRef.get();

    const data = {
      content: [],
      created: fieldsRef.data().created.toDate().toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    // contentRef.forEach((rule) => data.content.push(rule.data()));
    contentRef.forEach((rule) =>
      data.content.push({ ...rule.data(), id: rule.id }),
    );

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const categories = async (req, res, next) => {
  try {
    const categoriesRef = await categoriesCollectionRef
      .orderBy('created', 'asc')
      .get();

    const data = [];

    categoriesRef.forEach((category) => data.push(category.data()));

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const socials = async (req, res, next) => {
  try {
    const socialsRef = await blogCollectionRef.doc('socials').get();
    const socialsData = socialsRef.data();

    return res.status(200).json(socialsData);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  // navigation,
  blog,
  about,
  contact,
  updateSubscribe,
  slider,
  allPosts,
  recentPost,
  postDetails,
  addComment,
  pinnedPosts,
  archives,
  archivesPosts,
  privacyPolicy,
  categories,
  socials,
};
