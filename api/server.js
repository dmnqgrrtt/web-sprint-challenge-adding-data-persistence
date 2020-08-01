const express = require("express");
const server = express();

const projectsRouter = require("../projects/projects-router");
const resourcesRouter = require("../resources/resources-router");
const tasksRouter = require("../tasks/tasks-router")

server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/resources", resourcesRouter);
server.use("/api/tasks", tasksRouter);

module.exports = server;