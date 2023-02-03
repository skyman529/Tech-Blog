const router = require("express").Router();
const { Blogposts } = require("../models/");
const withAuth = require("../utils/auth");

//Finding all the existing blog posts
router.get("/", withAuth, async (req, res) => {
  try {
    const Blogposts = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage-admin", {
      layout: "dashboard",
      blogs,
    });
  } catch (err) {
    res.redirect("login");
  }
});

//Get a create blog form
router.get("/blog", withAuth, (req, res) => {
  res.render("blog", {
    layout: "dashboard",
    logged_in: req.session.logged_in,
  });
});

//Allows the user to edit a single post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id);

    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render("editpost", {
        layout: "dashboard",
        blog,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;