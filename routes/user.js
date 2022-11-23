const express = require("express");
const { body, validationResult } = require("express-validator");
const user = require("../model/userModel");
const cloudinary = require("../utils/cloudinary");
const router = express.Router();

router.post(
  "/",
  body("username"),
  body("occupation"),
  body("profile_picture"),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          status: "Failed By Validator",
          message: errors.array(),
        });
      } else {
        const { tempFilePath } = req.files.profile_picture;

        cloudinary.uploader.upload(
          tempFilePath,
          { folder: "kyra-tech" },
          async (err, result) => {
            if (err) res.status(500).json({ err });
            const data = await user.create({
              ...req.body,
              profile_picture: result.url,
            });

            res.status(200).json({
              status: "Success",
              message: data,
            });
          }
        );
      }
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error,
      });
    }
  }
);

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    let data = await user.find({ username: name });
    if (data.length !== 0) {
      res.status(200).json({
        status: "Success",
        message: data,
      });
    } else {
      res.status(500).json({
        status: "Failed",
        message: "No User Exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await user.find();
    res.status(200).json({
      status: "Success",
      message: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await user.find({ _id: id });
    if (userData !== null) {
      if (req.files) {
        const { tempFilePath } = req.files.profile_picture;
        cloudinary.uploader.upload(
          tempFilePath,
          { folder: "kyra-tech" },
          async (err, result) => {
            if (err) res.status(500).json({ err });
            const data = await user.updateOne(
              { _id: id },
              {
                username: req.body.username,
                occupation: req.body.occupation,
                profile_picture: result.url,
              }
            );
            res.status(200).json({
              status: "Success",
              message: data,
            });
          }
        );
      } else {
        const data = await user.updateOne(
          { _id: id },
          {
            username: req.body.username,
            occupation: req.body.occupation,
          }
        );
        res.status(200).json({
          status: "Success",
          message: data,
        });
      }
    } else {
      res.status(500).json({
        status: "Failed",
        message: "User Not Exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
});

module.exports = router;
