const express = require("express");
const router = express.Router();

const db = require("../data/db-config");
const { restart } = require("nodemon");

router.post("/", (req, res) => {
    const newProject = req.body;
    if (newProject.project_name) {
        db("projects")
            .insert(newProject)
            .then(id => {
                db("projects")
                .where({id})
                .first()
                .then(addedProject => {
                    res.status(201).json(addedProject);
                })
            })
            .catch(err => {
                restart.status(500).json({ message: "We were unable to add that project" })
            })
    } else {
        res.status(400).json({ message: "please provide a name for the project" })
    }

})

module.exports = router;