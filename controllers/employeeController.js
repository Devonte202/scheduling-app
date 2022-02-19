import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemon from "nodemon";
import Employee from "../modules/Employee.js";



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
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) throw "Invalid first or last name.";
    if (!phoneRegex.test(phoneNumber)) throw "Phone number invalid.";
    if (emailRegex.test(email) === false) throw "Email invalid.";
    if (password.length < 8) throw "Password too short.";
    return true;
  };

  const encryptPassword = async (password) => {
    try {
      const SALT_ROUNDS = 7;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      return hashedPassword;
    } catch (err) {
      throw err;
    }
    
  }

/**
 * Registers user's credentials, adding them to the database using the User model
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
export const register = async (req, res) => {
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
      validateInputs(firstName, lastName, email, phoneNumber, password);
      const hashedPassword = await encryptPassword(password)
      Employee.createAccount(businessId, firstName, lastName, email, phoneNumber, isAdmin, hashedPassword, profileImageUrl);
      const token = jwt.sign({ email, isAdmin, businessId }, process.env.AUTH_KEY);
      res.cookie("skedulrrToken", token).sendStatus(200);
    } catch (err) {
      res.status(500).json({err});
    }
  };

/**
 * Gives the user a token after verifying user's entered credentials
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
 export const login = async (req, res) => {
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
    } else {
      throw "Password incorrect"
    }
  } catch (err) {
    res.status(500).json({err});
  }
};

/**
 * Clears the user's cookie containing the token that verifies their identity
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
 export const logout = (req, res) => {
  res.clearCookie("skedulrrToken").sendStatus(200);
};

export const updateEmployeeInfo = async (req, res) => {
  try {
    const userInfo = await Employee.getById(req.userId);
    const { firstName, lastName, email, phoneNumber, isAdmin, password, profileImageUrl } = req.body;
    const hashedPassword = password ? await encryptPassword(password) : undefined;

    const updatedUserInfo = [
      firstName || userInfo.first_name,
      lastName || userInfo.last_name,
      email || userInfo.email,
      phoneNumber || userInfo.phone_number,
      isAdmin || userInfo.is_admin,
      hashedPassword || userInfo.password,
      profileImageUrl || userInfo.profile_image_url
    ]

    await Employee.updateAccount(req.userId, ...updatedUserInfo);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({err});
  }
};

/**
 * Retrieves the current logged in employee from the database and sends it to the client
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
 export const getLoggedInEmployee = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await Employee.getById(userId);
    if (!user) throw "User Does Not Exist";
    res.status(200).send(JSON.stringify(user));
  } catch (err) {
    res.status(404).json({err});
  }
};
/**
 * Retrieves the current logged in employee from the database and sends it to the client
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
export const getEmployeeById = async (req, res) => {
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
 export const createSchedule = async (req, res) => {
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
 export const updateSchedule = async (req, res) => {
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
 export const getSchedule = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const schedule = await Employee.getScheduleById(employeeId);
    if (!schedule) throw Error("Schedule has not yet been created");
    res.status(200).send(JSON.stringify(schedule));
  } catch (err) {
    res.status(404).send(err);
  }
};



export default {
  register,
  login,
  logout,
  getLoggedInEmployee,
  getEmployeeById,
  updateEmployeeInfo,
  createSchedule,
  getSchedule
}
