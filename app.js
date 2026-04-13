const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("node:path");
const { indexRouter } = require("./routes/indexRouter");
const { categoryRouter } = require("./routes/categoryRouter");
const { itemRouter } = require("./routes/itemRouter");

//set the view engine and define the views location
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//middleware that allows us to pass local files
app.use(express.static("public"));
//middleware to parse form input entry data into the request
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/items", itemRouter);

app.listen(process.env.PORT, async () => {
  try {
    const { main } = require("./db/populateDb"); // Export your main function
    await main();
    console.log("Database seeded successfully on startup.");
  } catch (err) {
    console.error("Seeding failed, but server is still running:", err);
  }
});
