const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
// bringing the user schema in
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route           POST api/users
// @description     Register user
// @access          Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // see if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        rating: "pg",
        d: "mm",
      });

      //   create a new user
      user = new User({
        name,
        email,
        avatar,
        password,
        accountType: "user",
      });

      // encrypt password using bcrypt
      //   10 rounds
      const salt = await bcrypt.genSalt(10);

      //   takes the user password and hashes it using salt
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      //   sign the token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          // if error, throw error
          if (err) throw err;
          //   else send token to client
          res.json({ token });
        }
      );

      //   res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// @route           POST api/users/guest
// @description     Register guest
// @access          Public
router.post("/guest", async (req, res) => {
  //   create a new guest user
  user = new User({ accountType: "guest" });

  await user.save();

  // return jsonwebtoken
  const payload = {
    user: {
      id: user.id,
    },
  };

  //   sign the token
  jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
    // if error, throw error
    if (err) throw err;
    //   else send token to client
    res.json({ token });
  });
});

// @route    PUT api/users/:id/
// @desc     Edit user settings
// @access   Private
router.put("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // Check user
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // update the settings
    user.settings.timeMode = req.body.timeMode;
    user.settings.auto = req.body.auto;
    if (req.body.sessionTime) {
      user.settings.sessionTime = req.body.sessionTime;
    }
    if (req.body.breakTime) {
      user.settings.breakTime = req.body.breakTime;
    }

    await user.save();
    return res.json(user.settings);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
