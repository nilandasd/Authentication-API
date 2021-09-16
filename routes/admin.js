const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Admin } = require("../models/models");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const result = await Admin.findOne({ name: req.body.name }).exec();
    if (bcrypt.compareSync(req.body.password, result.password)) {
      const token = jwt.sign({ name: req.body.name }, process.env.SECRET, {
        expiresIn: "1d",
      });
      res.set("admin-token", token);
      res
        .status(200)
        .json({
          description:
            "Admin authenticated, token stored in header 'admin-token'",
        });
    } else {
      res.status(401).json({ description: "Not authorized" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const admin = await Admin.findOne({ name: req.body.name }).exec();
    if (admin === null) {
      const hash = await bcrypt.hash(req.body.password, 13);
      const newAdmin = new Admin({
        name: req.body.name,
        password: hash,
      });
      await newAdmin.save();
      res.status(200).json({ description: "Admin created" });
    } else {
      res.status(401).json({ description: "Name taken" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const admin = await Admin.findOne({ name: req.body.name }).exec();
    if (admin === null) {
      const hash = await bcrypt.hash(req.body.password, 13);
      const newAdmin = new Admin({
        name: req.body.name,
        password: hash,
      });
      await newAdmin.save();
      res.status(200).json({ description: "Admin created" });
    } else {
      res.status(401).json({ description: "Name taken" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
