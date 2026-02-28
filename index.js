const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
let tasks = [];

// Home route
app.get
	('/',(req, res) => {res.send('Task Tracker API is running GOOD!');});

// Get all tasks
app.get
	('/tasks', (req, res) => {res.json(tasks);});

// Add new task
app.post
	('/tasks',(req, res) => {const newTask = {
											id: tasks.length +1,
											name: req.body.name,
											status: "pending"
											};
							tasks.push(newTask);
							res.json({
										message:"Task added successfully.",
										task: newTask
									});
	});

// Complete task
app.put
	('/tasks/:id', (req, res) => {const id = parseInt(req.params.id);
									const task = tasks.find(t => t.id === id);
									if(task){
												task.status = "Completed.";
												res.json(task);
												}
									else{
										res.status(404).send("Task not found.");}
									}
	
	);

// Delete task
app.delete
	('/tasks/:id', (req, res) => {const id = parseInt(req.params.id);
								tasks = tasks.filter(t => t.id !== id);
								res.send("Task deleted.");
								}
			
);

// Start Server
app.listen(3000, () => {console.log("Server runnig on port 3000");
});
