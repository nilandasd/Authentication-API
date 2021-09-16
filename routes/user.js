const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");

//authenticate request, should have admin token
router.put("/validate", async (req, res) => {
  try {
    jwt.verify(req.header("user-token"), process.env.SECRET);
    res.status(200).json({ description: "User authorized" });
  } catch (err) {
    res.status(401).json({ description: "Not authorized" });
  }
});

router.use("/", async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.header("admin-token"), process.env.SECRET);
    req.adminName = decoded.name;
    next();
  } catch (err) {
    res.status(401).json({ description: "Not authorized" });
  }
});

//authenticate user
router.post("/login", async (req, res) => {
    try {
      const result = await User.findOne({ name: req.body.name, service: req.body.service, owner: req.adminName }).exec();
      if (result && bcrypt.compareSync(req.body.password, result.password) ) {
        const token = jwt.sign({ name: req.body.name, claims: req.body.claims }, process.env.SECRET, {
          expiresIn: "1d",
        });
        res.set("user-token", token);
        res.status(200).json({
          description:
            "User authenticated, token stored in header 'user-token'",
        });
      } else {
        res.status(401).json({ description: "Not authorized" });
      }
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
});

//create user
router.post("/", async (req, res) => {
    try {
      const user = await User.findOne({
        name: req.body.name,
        service: req.body.service,
        owner: req.adminName,
      }).exec();
      if (user === null) {
        const hash = await bcrypt.hash(req.body.password, 13);
        const newUser = new User({
          name: req.body.name,
          password: hash,
          service: req.body.service,
          owner: req.adminName,
        });
        await newUser.save();
        res.status(200).json({ description: "User created" });
      } else {
        res.status(401).json({ description: "Name taken" });
      }
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
});

//update user password
router.put("/", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 13);
    const update = await User.updateOne(
      {
        name: req.body.name,
        service: req.body.service,
        owner: req.adminName,
      },
      { password: hash }
    );
    if (update.modifiedCount === 0) {
      res.status(200).json({ description: "User not found" });
    } else {
      res.status(200).json({ description: "User updated" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const update = await User.deleteOne({
      name: req.body.name,
      service: req.body.service,
      owner: req.adminName,
    });

    if (update.deletedCount == 0) {
      res.status(400).json({ description: "User not found" });
    } else {
      res.status(200).json({ description: "User deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
