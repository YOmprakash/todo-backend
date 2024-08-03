const express = require('express');
const Todo  = require('../models/Todo');
const router = express.Router();



// Create a new to-do item
router.post('/todos', async (req, res) => {
  const {  title } = req.body;

  if (!title) {
    return res.status(400).json({ error: ' title are required' });
  }

  try {
    const todo = new Todo({
      title,
      completed: false,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// get all todso

router.get('/todos', async(req,res) => {
  try{
    const todos = await Todo.find();
    res.status(200).json(todos)
  }catch (error) {
    res.status(400).send({ error: error.message });
  }

})

// delete a todo

router.delete('/todos/:id', async (req, res) => {
  const {id} = req.params;
  try{
    const deleteTodo = await Todo.findByIdAndDelete(id);
    if(!deleteTodo){
      return res.status(404).send({error: 'Todo not found'});
    }
    res.status(200).send({message: 'Todo deleted successfully'});

  }catch(e){
    res.status(400).send({ error: error.message });
  }
})

// update a todo 
  
router.put('/todos/:id',async(req,res) => {
  const {id} = req.params;
  const {title} = req.body;

  try{
    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title
       
      },
      { new: true, runValidators: true }
    );
    if(!updateTodo){
      return res.status(404).send({error: 'Todo not found'});
    }
    res.status(200).json(updateTodo);

  }catch(e){
    res.status(400).send({ error: error.message });
  }
})

module.exports = router;
