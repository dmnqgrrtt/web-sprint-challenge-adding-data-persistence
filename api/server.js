const express = require("express");
const server = express();

const projectsRouter = require("../projects/projects-router");

server.use(express.json());
server.use("/api/projects", projectsRouter)

module.exports = server;