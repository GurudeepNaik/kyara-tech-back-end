const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/user");
const cors = require("cors");
const file_upload=require("express-fileupload")

const app = express();
app.use(file_upload({
     useTempFiles:true
}))
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const PORT = process.env.PORT || 8080;

mongoose.connect(
  "mongodb+srv://gurudeepnaik:gurudeepnaik@cluster0.ocg5cwr.mongodb.net/userDetails?retryWrites=true&w=majority",
  (err) => {
    if (err) console.log(err);
    else console.log("Database Connected");
  }
);

app.use("/api/user", user);

app.get("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "Invalid Path",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up at http://localhost:${PORT}/`);
});
