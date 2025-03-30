//Express import and port definition
const express = require('express');
const app = express();
const PORT = 3000;

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

//Task manager REST API

// Task object array 
let tasks = [
    {id: 0, title: 'default test task', completed: false},
    {id: 1, title: 'make bed', completed: true}
];



//Get the tasks
app.get('/tasks/:id/', (req, res) => {

    const taskid = parseInt(req.params.id);

    const task = tasks.find(t => t.id === taskid);

    if(!task){
        return res.status(404).json({error: "Task not found"});
    }

    res.json(task);
    

});

//Update tasks [Updating using postman]

app.put('/tasks/:id', (req, res) => {
    const taskid = parseInt(req.params.id); 
    const {title, completed} = req.body; // Get the data from the body

    const task = tasks.find( t => t.id === taskid);

    if(!task) {
        return res.status(404).json({error: "Task not found"});
    }

    if (title) task.title = title;
    if (completed) task.completed = completed;

    res.json(task);
});


//Create tasks [Create using postman]
app.post('/tasks/:id', (req, res) => {

    const taskid = parseInt(req.params.id);
    const {title, completed} = req.body;

    tasks.push({"id": taskid, "title": title, "completed": completed});

    const task = tasks.find(t => t.id === taskid);

    res.json(task);


});

//Delete tasks [Delete using postman]
app.delete('/tasks/:id', (req, res) => {

    const taskid = parseInt(req.params.id);

    const task = tasks.find(t => t.id === taskid);

    const index = tasks.findIndex(t => t.id === taskid);

    tasks.splice(index, 1);

    res.json({"message": "Task deleted successfully", "task": task});


});