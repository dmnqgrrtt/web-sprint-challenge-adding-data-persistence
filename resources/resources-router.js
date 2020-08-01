const express = require("express");
const router = express.Router();

const db = require("../data/db-config");


router.post("/", (req, res) => {
    const newResource = req.body;
    if (newResource.resource_name) {
        db("resources")
            .insert(newResource)
            .then(id => {
                db("resources")
                .where({id})
                .first()
                .then(addedResource => {
                    res.status(201).json(addedResource);
                })
            })
            .catch(err => {
                restart.status(500).json({ message: "We were unable to add that resource" })
            })
    } else {
        res.status(400).json({ message: "please provide a name for the resource" })
    }

})

router.get("/", (req,res) => {
    db("resources")
    .then(resources => {
        res.status(200).json(resources);
    })
    .catch(err => {
        res.status(500).json({message: "we were unable to retreive the resources"})
    })
})

module.exports = router;