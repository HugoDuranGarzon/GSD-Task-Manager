//Task manager REST API

//Express import and port definition
const express = require('express');
const app = express();
const PORT = 3000;

//Database import
const db = require('./database.js');

//Read JSON on request
app.use(express.json());

//Main route definition
app.get('/', (req, res) => {
    res.send('Hello world from express!');
});


//Server initialization on port 3000
app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});

//Get the tasks
app.get('/tasks/:id/', (req, res) => {

    const taskid = parseInt(req.params.id);

    db.get('SELECT * FROM tasks WHERE id = ?', [taskid], (err, row) =>{
        if(err){
            res.status(500).json({ error: err.message});
        } else if (!row){
            res.status(404).json({error: "Task not found"});
        }else{
            res.json(row);
        }
    });
});

//Update tasks [Updating using postman]

app.put('/tasks/:id', (req, res) => {
    const taskid = parseInt(req.params.id); 
    const {title,comments,completed} = req.body; // Get the data from the body

    db.run('UPDATE tasks SET title = ?, comments = ?, completed = ? WHERE id = ?',  [title, comments, completed, taskid], (err) => {
        if(err){
            res.status(500).json({error: err.massage});
        }else{
            res.json("Task updated successfully");
        }
    });

});

//Create tasks [Create using postman]

app.post('/tasks/:id', (req, res) => {

    const taskid = parseInt(req.params.id);
    const {title,comments,completed} = req.body;

    db.run('INSERT INTO tasks (id, title, comments, completed) VALUES (?,?,?,?)', [taskid,title,comments,completed], (err) => {
        if(err){
            res.status(500).json({error: err.message});
        }else{
            res.json("Task saved successfully");
        }
    });
});

//Delete tasks [Delete using postman]
app.delete('/tasks/:id', (req, res) => {

    const taskid = parseInt(req.params.id);

    db.run('DELETE FROM tasks WHERE id = ?', [taskid], (err) =>{
        if(err){
            res.status(500).json({error: err.message});
        }else{
            res.json("Task deleted successfully");
        }
    });
});