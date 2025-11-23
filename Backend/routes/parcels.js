const express = require("express");
const router = express.Router();
const Parcel = require("../models/Parcel");

// ADD PARCEL

router.post("/", async (req, res) => {
  const newParcel = Parcel(req.body);
  try {
    const parcel = await newParcel.save();
    res.status(201).json(parcel);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL PARCELS

router.get("/", async (req, res) => {
  try {
    const parcels = await Parcel.find().sort({ createdAt: -1 });
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json(error);
  }
});

// TRACK PARCEL BY ID (using MongoDB _id as Tracking ID) - MUST BE BEFORE OTHER /:id ROUTES
router.get("/track/:trackingId", async (req, res) => {
  try {
    const { trackingId } = req.params;

    // Validate if trackingId is a valid MongoDB ObjectId
    if (!require("mongoose").Types.ObjectId.isValid(trackingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tracking ID format",
      });
    }

    const parcel = await Parcel.findById(trackingId);

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Tracking ID not found",
      });
    }

    res.status(200).json({
      success: true,
      data: parcel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error tracking parcel",
      error: error.message,
    });
  }
});

// GET STATS (parcel counts by status) - BEFORE OTHER /:id ROUTES
router.get("/stats/overview", async (req, res) => {
  try {
    const delivered = await Parcel.countDocuments({ status: 3 });
    const pending = await Parcel.countDocuments({ status: 1 });
    res.status(200).json({ delivered, pending });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USERS PARCEL
router.post("/me", async (req, res) => {
  try {
    const parcels = await Parcel.find({ senderemail: req.body.email }).sort({
      createdAt: -1,
    });
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE PARCEL

router.put("/:id", async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(parcel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ONE PARCEL

router.get("/find/:id", async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    res.status(200).json(parcel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE SHIFT

router.delete("/:id", async (req, res) => {
  try {
    await Parcel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Parcel has been deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
