const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = 8080;

// Middleware untuk parsing request body
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/uploads")); // Simpan file ke folder uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename file agar unik
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("<h1>Request to GET / !</h1>");
});

app.post("/files", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send({
    message: "File uploaded successfully",
    fileUrl: `/public/uploads/${req.file.filename}`, // URL untuk mengakses file
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
