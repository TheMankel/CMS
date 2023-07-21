const { firestore } = require('firebase-admin');
const { db, firebase, bucket } = require('../config/firebase-config');

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
    const { description, image, text, title, category } = req.body;

    const postRef = await postsCollectionRef.where('title', '==', title).get();

    console.log(postRef.empty);

    if (!postRef.empty)
      return res.json({
        error: 'Post with same title already exists!',
      });

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
      category: category,
    };

    const postTitle = title?.toLowerCase().replaceAll(' ', '-');

    await postsCollectionRef.doc(postTitle).set(data);

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { description, image, text, title, category } = req.body;

    const data = {
      description: description,
      image: image,
      text: text,
      title: title,
      category: category,
    };

    const postTitle = title?.toLowerCase().replaceAll(' ', '-');

    await postsCollectionRef.doc(postTitle).update(data);

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.body;

    const postRef = postsCollectionRef.doc(id);
    await postRef.delete();

    return res.status(200).json('Post deleted!');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { title, logo } = req.body;
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
    const { title, description } = req.body;

    const fieldsRef = blogCollectionRef.doc('privacy-policy');
    const policyRef = blogCollectionRef
      .doc('privacy-policy')
      .collection('content');

    const date = new Date();

    const shortDate = date.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const data = {
      created: firestore.Timestamp.fromDate(date),
      date: shortDate,
      title: title,
      description: description,
    };

    await policyRef.add(data);
    await fieldsRef.update({ created: firestore.Timestamp.fromDate(date) });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const editPolicy = async (req, res, next) => {
  try {
    const { id, description, title } = req.body;

    const fieldsRef = blogCollectionRef.doc('privacy-policy');
    const policyRef = blogCollectionRef
      .doc('privacy-policy')
      .collection('content');

    const date = new Date();

    const data = {
      title: title,
      description: description,
    };

    await policyRef.doc(id).update(data);
    await fieldsRef.update({ created: firestore.Timestamp.fromDate(date) });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deletePolicy = async (req, res, next) => {
  try {
    const { id } = req.body;

    const fieldsRef = blogCollectionRef.doc('privacy-policy');
    const policyRef = blogCollectionRef
      .doc('privacy-policy')
      .collection('content')
      .doc(id);

    const date = new Date();

    await policyRef.delete();
    await fieldsRef.update({ created: firestore.Timestamp.fromDate(date) });

    return res.status(200).json('Team member deleted!');
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

    await pinnedPostsRef.update(data);
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

const updateContact = async (req, res, next) => {
  try {
    const { email, phone } = req.body;

    const contactRef = blogCollectionRef.doc('contact');

    const data = {
      email: email,
      phone: phone,
    };

    await contactRef.update(data);

    return res.status(200).json('Contact changed');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateStory = async (req, res, next) => {
  try {
    const { primary, secondary } = req.body;

    const aboutRef = blogCollectionRef.doc('about');

    const data = {
      'story.primary': primary,
      'story.secondary': secondary,
    };

    await aboutRef.update(data);

    return res.status(200).json('Story updated');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateTeam = async (req, res, next) => {
  try {
    const { name, title, about, avatar } = req.body;

    const teamRef = blogCollectionRef.doc('about').collection('team');

    const date = new Date();

    const data = {
      created: firestore.Timestamp.fromDate(date),
      name: name,
      title: title,
      about: about,
      avatar: avatar,
    };

    const teamDoc = await teamRef.add(data);
    const file = bucket.file(`teamImages/${name}`);
    const newFile = bucket.file(`teamImages/${teamDoc.id}`);
    await file.move(newFile);
    const url = newFile.id;

    await teamDoc.update({
      avatar: `https://firebasestorage.googleapis.com/v0/b/cms-blog-pp.appspot.com/o/${url}?alt=media`,
    });

    return res.status(200).json('New team member added');
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

const editTeam = async (req, res, next) => {
  try {
    const { name, title, about, avatar, id } = req.body;

    const teamRef = blogCollectionRef.doc('about').collection('team');

    const data = {
      name: name,
      title: title,
      about: about,
      avatar: avatar,
    };

    console.log(id);

    await teamRef.doc(id).update(data);

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.body;

    const teamRef = blogCollectionRef.doc('about').collection('team').doc(id);
    await teamRef.delete();

    return res.status(200).json('Team member deleted!');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateSocials = async (req, res, next) => {
  try {
    const { name, url } = req.body;

    const socialsRef = blogCollectionRef.doc('socials');
    const socialsGet = await socialsRef.get();
    const socialsData = socialsGet.data();

    socialsData[name.toLowerCase()] = url;
    socialsRef.update(socialsData);

    return res.status(200).json('Socials updated!');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;

    const date = new Date();

    const shortDate = date.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const data = {
      created: firestore.Timestamp.fromDate(date),
      date: shortDate,
      title: title,
      description: description,
      image: image,
    };

    const categoryTitle = title?.toLowerCase().replaceAll(' ', '-');

    await categoriesCollectionRef.doc(categoryTitle).set(data);
    return res.status(200).json('Categories updated!');
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const editCategory = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;

    const data = {
      title: title,
      description: description,
      image: image,
    };

    const categoryTitle = title?.toLowerCase().replaceAll(' ', '-');

    await categoriesCollectionRef.doc(categoryTitle).update(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.body;
    const posts = await postsCollectionRef.get();

    posts.forEach(async (post) => {
      const postData = post.data();

      if (postData.category === id) {
        const postTitle = postData.title?.toLowerCase().replaceAll(' ', '-');
        await postsCollectionRef.doc(postTitle).update({ category: 'none' });
      }
    });

    const categoryId = id.toLowerCase().replaceAll(' ', '-');
    const categoryRef = categoriesCollectionRef.doc(categoryId);

    await categoryRef.delete();
    return res.status(200).json('Category deleted!');
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
  editPolicy,
  deletePolicy,
  updatePinnedPosts,
  updateSlider,
  users,
  updateUser,
  deleteUser,
  updateContact,
  updateStory,
  updateTeam,
  editTeam,
  deleteTeam,
  updateSocials,
  updateCategory,
  editCategory,
  deleteCategory,
};
