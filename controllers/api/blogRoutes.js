const router = require('express').Router();
const { Blogposts, User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const postData = await Blogposts.findAll({
          attributes:[
              "id",
              "title",
              "description",
             
          ],

          order: [
            ["description", "DESC"]
          ],

          include: [{
            model: User,
            attributes: ["email"]
          },
  
          {
            model: Comments,
            attributes: ['id', "comment_text", "user_id", "post_id"],
        include: {
          model:User,
          attributes: ["email"]
        }
          }
       
        ]
      });
      if (!postData){
        res.status(404).json({message: "No post found with this id!"});
        return;
      }

      res.status(200).json(postData);
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.body, {
        where: {
          id:req.params.id
        },

    attributes: [
        "id", 
        "description"
        
    ],

      include: [{
        model: User, 
        attributes: ["email"]
    },
  
        {
          model: Comments,
          attributes: ['id', "comments_text", "user_id", "blogposts_id"],
      include: {
        model:User,
        attributes: ["email"]
      }
        
    },
       
      ],
    });
         if (!postData){
            res.status(404).json({message:"No post found with this id"});
            return;
         }
         res.json(postData);

    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.post("/", withAuth, (req, res) => {
    Blogposts.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id

    }).then((postData) => res.json(postData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
  }); 



  router.put('/:id', withAuth, async(req, res) => {
  
    try {
      const dbpostData = await Blogposts.update(req.body, {
        where: {
          
          id:req.params.id
        },
      });
  
      if (!dbpostData){
        res.status(404).json({message: "No blogposts found by this id"});
        return;
      }
  
      res.status(200).json(dbpostData);
      
    } catch (error) {
      res.status(500).json(err);
    }
  });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Blogposts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found by this id" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
