const express = require('express');
const app = express();
const port = 3001;
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json())

// Set up Database connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'taskDB'
})

// Tasks routes
app.get("/tasks", (req,res)=> {
    db.query("SELECT * FROM tasks", (error,results) => {
        error ? console.log(error) :
        res.send(results)
    })
})

app.post("/tasks", (req,res)=> {
    const taskName = req.body.taskName
    const listID = req.body.listID
    console.log(taskName,listID)
    db.query("INSERT INTO tasks (taskName,listID) VALUES (?,?)",[taskName,listID],
    (error,results) => {
        error ? console.log(error) : 
        res.send(results)
    })
})

app.delete("/tasks", (req, res) => {
    const id = req.body.id
    
    db.query("DELETE FROM tasks WHERE id=(?)",[id],
    
    (error,results) => {
        error ? console.log(error) :
        res.send(results)
    })
})

app.put("/tasks", (req,res) => {
    const task = req.body
    const taskToUpdate = [task.listID,task.taskStatus,task.taskName,task.taskDescription,task.taskTags,task.dueDate,task.id]
    db.query("UPDATE tasks SET listID=(?),taskStatus=(?),taskName=(?),taskDescription=(?),taskTags=(?),dueDate=(?) WHERE id=(?)", taskToUpdate, (error,results) => {
        error ? console.log(error) :
        res.send(results)
    })
} )

// Projects routes
app.get("/projects", (req,res)=> {
    db.query("SELECT * FROM projects", (error,results) => {
        error ? console.log(error) :
        res.send(results)
    })
})

app.post("/projects", (req, res) => {
    const projectName = req.body.projectName
    
    db.query("INSERT INTO projects (projectName) VALUES (?)", [projectName],
    (error,results) => {
        error ? console.log(error) :
        res.send(results)
    })
})

app.delete("/projects", (req, res) => {
    const id = req.body.id
    
    db.query("DELETE FROM projects WHERE id=(?)",[id],
    
    (error,results) => {
        error ? console.log(error) :
        res.send(results)
    })
})

// List routes

app.get("/lists", (req,res)=> {
    
    db.query("SELECT * FROM lists", (error,results) => {
        error ? console.log(error) :
        res.send(results)
    })
})

app.post("/lists", (req,res) => {
    const listName = req.body.listName
    const projectID = req.body.projectID
    db.query("INSERT INTO lists (listName,projectID) VALUES (?,?)",[listName,projectID],
    (error,results) => {
        error ? console.log(error) :
        res.send(results)
    })
})

app.delete("/lists", (req,res) => {
    const id = req.body.id

    db.query("DELETE FROM lists WHERE id=(?)",[id],
    (error,results) => {
        error ? console.log(error) :
        res.send(results)
    })
})








app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})