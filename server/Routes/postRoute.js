const app = require('express');
const router = app.Router();
const postModel =  require('../Models/postModel');


async function NextId(){
    let collection = null;
      collection= await postModel.find({})
      let id = 0
       collection.forEach((el) => {
           if (el.id > id) {
               id = el.id;
           }
       });
       return (id +1 )
   }

   async function getAllPosts(){
    let postArr= await postModel.find({},(err, users)=>{
       return users
    });
    return postArr;
    }


router.route('/').get((req, res) => {
    postModel.find({}, (err, posts)=>{
        if (err) {
            console.log('Cannot find posts');
            res.status(400).send(err);
        }
        res.status(200).json(posts);

    });
});
router.route('/:id').get((req, res) => {
    let id = req.params.id
    postModel.find({ userId : id}, (err, postObj)=>{
        if (err) return res.send(err);
    
        res.status(200).send(postObj);

    });
});


router.route('/').post( async function(req,resp)
        {
            const id = await NextId()
            const newPost = new postModel({
                id : id,
                userId: req.body.userId,
                title:req.body.title,
                body:req.body.body
            });

            newPost.save(async(err) => {
                if(err)
                {
                    return resp.send(err)
                }
                else
                {
                    let posts = await getAllPosts();
                    console.log('Added New Post');
                     return resp.json(posts).status(200);
                }
            })     
        });

router.route('/:id').put((req, res) => {
    let Id = req.params.id
    postModel.findByIdAndUpdate(Id, 
        {
                title:req.body.title,
                body:req.body.body
        }
        
        ,(err)=>{
        if(err) return res.send('Unable to update record!')
        res.json('Updated Successfuly!')      
  });
});

router.route('/:id').delete(async(req, res)=>{
    try{
        const id  = req.params.id
       await postModel.deleteMany({userId: id})
        let posts = await getAllPosts();
        res.json(posts)
    }catch(error){
        res.send(error)
    }
    
    });

module.exports = router;