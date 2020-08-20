const app = require('express');
const router = app.Router();
const User =  require('../Models/userModel');

async function getAllUses(){
let UsersArr= await  User.find({},(err, users)=>{
   return users
});

return UsersArr;
}

async function NextId(){
    let collection = null;
      collection= await User.find({})
      let id = 0
       collection.forEach((el) => {
           if (el.id > id) {
               id = el.id;
           }
       });
       return (id +1 )
   }

//GET ALl Users
router.route('/').get((req, res) => {
    User.find({}, (err, users)=>{
        if (err) {
            console.log('Cannot find Users');
            res.status(400).send(err);
        }
        res.status(200).json(users);

    });
});
// get by ID
router.route('/:id').get((req, res) => {
    let id = req.params.id
    User.findById(id, (err, users)=>{
        if (err) return res.send(err);
        res.status(200).json(users);

    });
});

//Post 
router.route('/').post(async function(req,resp)
        {
            const id = await NextId()
            const newUser = new User({
                id: id,
                name: req.body.name,
                email: req.body.email,
                address: {
                 street: req.body.address.street,
                  city: req.body.address.city,
                  zipcode: req.body.address.zipcode
                }
            });

            newUser.save(async(err) => {
                if(err)
                {
                    return resp.send(err)
                }
                else{
                    let users = await getAllUses();
                    return resp.json(users);
                }
            })     
        });

//update by id 
router.route('/:id').put((req, res) => {
    let Id = req.params.id
    User.findByIdAndUpdate(Id, 
        {
            name: req.body.name,
            email: req.body.email,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                zipcode: req.body.address.zipcode
            }
        }
        
        ,async(err)=>{
        if(err) {
            return res.send('Unable to update record!')
        }
        else{
            let users = await getAllUses();
            console.log('User Update Successfuly!');
           return res.status(200).json(users)      

        }
  });
});


//Delete By Id 
router.route('/:id').delete((req, res)=>{
    User.findByIdAndDelete({_id:req.params.id},async(err)=>{
        if(err) res.json(err);
        else{
            let users = await getAllUses();
            console.log('user deleted successfuly!');
            res.json(users);  
        }
    });
    });


module.exports = router;