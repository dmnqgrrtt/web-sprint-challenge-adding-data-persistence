const express = require("express");
const router = express.Router();

const db = require("../data/db-config");


router.post("/", validateProjectId, (req, res) => {
    const newTask = req.body;
    if (newTask.description) {
        if (newTask.project_id) {
            db("tasks")
                .insert(newTask)
                .then(id => {
                    db("tasks")
                        .where({ id })
                        .first()
                        .then(addedTask => {
                            res.status(201).json(addedTask);
                        })
                })
                .catch(err => {
                    res.status(500).json({ message: "We were unable to add that task" })
                })
        } else {
            res.status(400).json({ message: "please provide the project id for the task" })
        }

    } else {
        res.status(400).json({ message: "please provide a description for the task" })
    }


})

router.get("/", (req, res) => {
    db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .select("p.project_name", "p.description as project description", "t.description as task description","t.notes", "t.completed as task completed" )
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(err => {
            res.status(500).json({ message: "we were unable to retreive the tasks" })
        })
})

function validateProjectId (req,res,next) {
    const id = req.body.project_id;

    db("projects").where({id})
    .then(project => {
        console.log("this is the project", project)
        if(project.length){
            next();
        } else {
            res.status(400).json({message: "We were unable to find a project with that id"})
        }
    })
}

module.exports = router;