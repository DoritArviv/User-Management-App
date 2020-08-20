const app = require('express');
const router = app.Router();
const Todo =  require('../Models/todoModel');

async function getAllTodo(){
    let TodoArr= await Todo.find({},(err, users)=>{
       return users
    });
    return TodoArr;
    }

   async function NextId(){
     let collection = null;
       collection= await Todo.find({})
       let id = 0
        collection.forEach((el) => {
			if (el.id > id) {
				id = el.id;
            }
        })
        return (id +1 )
    }

//GET ALl Users
router.route('/').get((req, res) => {
    Todo.find({}, (err, todo)=>{
        if (err) {
            console.log('Cannot find Users');
            res.status(400).send(err);
        }
        res.status(200).json(todo);

    });
});

//Get By Id
router.route('/:id').get((req, res) => {
    let userId = req.params.id
    Todo.find({userId}, (err,todo)=>{
        if(err) return res.send(err)
        res.send(todo)      
  });
});

//Post- Create new todo
router.route('/').post(async function(req,resp){
    const id =  await NextId()
            const p = new Todo({
                id : id,
                userId : req.body.userId,
                title : req.body.title,
                completed : req.body.completed
            });

            p.save(async(err) => {
                if(err)
                {
                    return resp.send(err)
                }
                else
                {
                    let todos = await getAllTodo();
                    console.log('Added New Todo');
                     return resp.json(todos).status(200);
                }
            })     
        });




router.route('/:id').put(async(req, res) => {
    try {
		const id = req.params.id;

		await Todo.findOneAndUpdate(
			{ id: id },
			{ completed: true }
		);
        let todos = await getAllTodo();
		res.json(todos);
	} catch (error) {
		res.send(error);
	}
    
});



router.route('/:id').delete(async(req, res)=>{
try{
    const id  = req.params.id
    await Todo.deleteMany({userId: id})
    let todos = await getAllTodo();
    res.json(todos)
}catch(error){
    res.send(error)
}

});
    

module.exports = router;