const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");
const Employee = require("../modules/Employee");
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
require("dotenv").config();


/**
 * Validates users registration credentials
 * @param {string} firstName - The users first name
 * @param {string} lastName - The users last name
 * @param {string} email - The user's email address
 * @param {string} phoneNumber - The users phone number
 * @param {string} password - The user's password (to be hashed server-side)
 */
 const validateInputs = (firstName, lastName, email, phoneNumber, password) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    const nameRegex = /^[a-z ,.'-]+$/i;
    const parsedNumber = phoneUtil.parse(phoneNumber, 'US')
    if(nameRegex.test(firstName === false) || nameRegex.test(lastName === false)) throw Error("Invalid first or last name.");
    if (!phoneUtil.isValidNumberForRegion(parsedNumber, 'US')) throw Error("Phone number invalid.");
    if (emailRegex.test(email) === false) throw Error("Email invalid.");
    if (password.length < 8) throw Error("Password too short.");
    return true;
  };

/**
 * Registers user's credentials, adding them to the database using the User model
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
const register = async (req, res) => {
    try {
      const {
        businessId, 
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        isAdmin,
        profileImageUrl
      } = req.body;
      await validateInputs(firstName, lastName, email, phoneNumber, password);
      const saltRounds = 7;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      Employee.createAccount(businessId, firstName, lastName, email, phoneNumber, isAdmin, hashedPassword, profileImageUrl);
      const token = jwt.sign({ email, isAdmin, businessId }, process.env.AUTH_KEY);
      res.cookie("skedulrrToken", token).sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  };

/**
 * Gives the user a token after verifying user's entered credentials
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
 const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.getByEmail(email);

    if (!user) {
      return res.status(401).send("User Does Not Exist.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const token = jwt.sign({ email, isAdmin: user.isAdmin, businessId: user.businessId }, process.env.AUTH_KEY);
      res.cookie("skedulrrToken", token).status(200).send(JSON.stringify(user));
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

/**
 * Clears the user's cookie containing the token that verifies their identity
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
 const logout = (req, res) => {
  res.clearCookie("skedulrrToken").sendStatus(200);
};

const updateEmployeeInfo = async (req, res) => {
  try {
    const { newData: employeeId, firstName, lastName, email, phoneNumber, isAdmin, password, profileImageUrl } = req.body;
    await Employee.updateAccount(employeeId, firstName, lastName, email, phoneNumber, isAdmin, password, profileImageUrl);
    res.sendStatus(200);
  } catch (err) {
    restart.status(500).send(err);
  }
};

/**
 * Retrieves the current logged in employee from the database and sends it to the client
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
 const getLoggedInEmployee = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await Employee.getById(userId);
    if (!user) throw Error("User Does Not Exist");
    res.status(200).send(JSON.stringify(user));
  } catch (err) {
    res.status(404).send(err);
  }
};
/**
 * Retrieves the current logged in employee from the database and sends it to the client
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
const getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const user = await Employee.getById(employeeId);
    if (!user) throw Error("Employee Does Not Exist");
    res.status(200).send(JSON.stringify(user));
  } catch (err) {
    res.status(404).send(err);
  }
};

/**
 * Creates a schedule for a new employee
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
 const createSchedule = async (req, res) => {
  try {
    const { employeeId } = req.params;
    await Employee.createSchedule(employeeId, eventTypes);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

/**
 * Creates a schedule for a new employee
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
 const updateSchedule = async (req, res) => {
  try {
    const { employeeId } = req.params;
    await Employee.createSchedule(employeeId, eventTypes);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

/**
 * Get schedule for a specific employee
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
 const getSchedule = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const schedule = await Employee.getScheduleById(employeeId);
    if (!schedule) throw Error("Schedule has not yet been created");
    res.status(200).send(JSON.stringify(schedule));
  } catch (err) {
    res.status(404).send(err);
  }
};



module.exports = {
  register,
  login,
  logout,
  getLoggedInEmployee,
  getEmployeeById,
  updateEmployeeInfo,
  createSchedule,
  getSchedule
}
