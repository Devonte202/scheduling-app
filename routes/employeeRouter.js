import express from "express";
const employeeRouter = express.Router();
import { register, login, logout, updateEmployeeInfo, getLoggedInEmployee, getEmployeeById } from "../controllers/employeeController.js";
import authenticate from "../middleware/authenticate.js";

// API employee controller paths
employeeRouter.post("/employee/api/register", register);
employeeRouter.post("/employee/api/login", login);
employeeRouter.get("/employee/api/logout", logout);
employeeRouter.put("/employee/api/updateInfo", authenticate, updateEmployeeInfo);
employeeRouter.get("/employee/api/getLoggedInEmployee", authenticate, getLoggedInEmployee);
employeeRouter.get("/employee/api/getEmployeeById/:employeeId", getEmployeeById);

export default employeeRouter;
