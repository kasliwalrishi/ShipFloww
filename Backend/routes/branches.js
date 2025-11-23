const express = require("express");
const router = express.Router();
const Branch = require("../models/Branch");

// CREATE NEW BRANCH
router.post("/", async (req, res) => {
  const newBranch = Branch(req.body);
  try {
    const branch = await newBranch.save();
    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL BRANCHES
router.get("/", async (req, res) => {
  try {
    const branches = await Branch.find().sort({ createdAt: -1 });
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ONE BRANCH BY ID
router.get("/:id", async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    res.status(200).json(branch);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE BRANCH
router.put("/:id", async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(branch);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE BRANCH
router.delete("/:id", async (req, res) => {
  try {
    await Branch.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Branch has been deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
