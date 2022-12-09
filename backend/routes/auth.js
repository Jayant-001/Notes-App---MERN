const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser')

JWT_SECRET = "iamjayant";


// ROUTE 1: create a user using POST "api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Invalid name").isLength({ min: 3 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if error: return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if email already exist
      let user = await User.findOne({ email: req.body.email });
      let success = false;

      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with this email is alreay exists" });
      }

      // ecnrypting password
      const salt = await bcrypt.genSalt(10);
      const encryptPass = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptPass,
      });
      //   .then(user => res.json(user))
      //   .catch(err => {
      //     console.log(err)
      //     res.json({error: err.message})
      //   })

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      success = true
      res.status(200).json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);


// ROUTE 2: User Login - 'api/auth/login' - Login not required
router.post(
  "/login",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password").exists(),
  ],
  async (req, res) => {
    // if error: return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      let success = false;
      if (!user) {
        return res.status(400).json({ success, error: "Incorrect credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ success,  error: "Incorrect credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.status(200).json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);


// ROUTE 3: Get user details - 'api/auth/getuser' - Login required
router.post("/getuser", fetchuser, async (req, res) => {

  // find user by id
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

module.exports = router;
