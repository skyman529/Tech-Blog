const router = require("express").Router();
const { BlogPost, User, Comments } = require("../models");
const withAuth = require("../utils/auth");

router.get("/dashboard", (req, res) => {
  if (!req.session.logged_in) {
    res.sendStatus(404);
    return;
  }
  res.render("dashboard");
});

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogdatas = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comments,
          include: [User],
        },
      ],
    });
    if (blogdatas) {
      const blog = blogdatas({ plain: true });
      res.render("singlepost", { blog });
    } else {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("sign-up");
});

router.get("/blog", (req, res) => {
  if (!req.session.logged_in) {
    res.sendStatus(404);
    return;
  }
  res.render("blog");
});

router.get("edit/:id", async (req, res) => {
  try {
    const blogdatas = await BlogPost.findByPk(req.params.id);

    const blog = blogdatas.get({ plain: true });

    res.render("editpost", {
      blog: blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;