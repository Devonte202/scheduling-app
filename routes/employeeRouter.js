const express = require("express");
const employeeRouter = express.Router();
const employeeController = require("../controllers/employeeController");
const authenticate = require("../middleware/authenticate");

// API employee controller paths
employeeRouter.post("/employee/api/register", employeeController.register);
employeeRouter.post("/employee/api/login", employeeController.login);
employeeRouter.get("/employee/api/logout", employeeController.logout);

module.exports = employeeRouter;
