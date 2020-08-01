const express = require("express");
const server = express();

const projectsRouter = require("../projects/projects-router");
const resourcesRouter = require("../resources/resources-router");

server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/resources", resourcesRouter);

module.exports = server;