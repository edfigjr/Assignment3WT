const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('', async (req, res) => {
  try {
    const locals = {
      title: "X-Men Blog",
      description: "Welcome to the X-Men Blog, your source for all things mutant-related!"
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();


    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }

    res.render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});


router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Search for mutant-related content here!"
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


router.get('/about', (req, res) => {
  res.render('about', {
    currentRoute: '/about'
  });
});


router.get('/contact', (req, res) => {
  res.render('contact', {
    currentRoute: '/contact'
  });
});


function insertPostData () {
  Post.insertMany([
    {
      title: "The Mutant Brotherhood's Latest Scheme",
      body: "The Brotherhood of Mutants is at it again, causing chaos and destruction wherever they go. Stay tuned for updates on their latest nefarious plot!"
    },
    {
      title: "Professor Xavier's Message of Hope",
      body: "Professor Charles Xavier, founder of the X-Men, delivers a powerful message of hope and unity in the face of adversity. Read his inspiring words here."
    },
    {
      title: "The Danger Room: Training Ground for Heroes",
      body: "Step inside the Danger Room, where the X-Men hone their skills and prepare for battle against the forces of evil. Witness their training firsthand!"
    }
  ]);
}


insertPostData();

module.exports = router;
