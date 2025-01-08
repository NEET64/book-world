require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const bookRouter = require("./router/book");
const userRouter = require("./router/users");

// allow access of the api
app.use(cors());

// to support incoming form data in json
app.use(express.json());

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to Database"))
  .catch(() => console.log("Error Connecting to Database"));

const path = require("path");
const wrapAsync = require("./utils/wrapAsync");
const Visitor = require("./models/visits");
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));

app.use("/books", bookRouter);
app.use("/users", userRouter);
app.post(
  "/log-visit",
  wrapAsync(async (req, res) => {
    const { userAgent } = req.body;
    ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let visitor = await Visitor.findOne({ ip });

    if (visitor) {
      visitor.visitCount += 1;
      await visitor.save();
      return res.status(200).json({
        message: "Visit logged",
        newVisitor: false,
        totalVisitors: await Visitor.countDocuments(),
        totalVisits: visitor.visitCount,
      });
    } else {
      visitor = new Visitor({
        userAgent,
        ip,
      });
      await visitor.save();
      return res.status(200).json({
        message: "New visitor created",
        newVisitor: true,
        totalVisitors: await Visitor.countDocuments(),
        totalVisits: visitor.visitCount,
      });
    }
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "This is home route",
  });
});

// managing errors
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({
    message: message,
  });
});

// setting up http server at port
app.listen(port, () => {
  console.log(`There server is running at ${port}`);
});
