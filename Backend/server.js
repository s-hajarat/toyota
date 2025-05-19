const express = require("express");
const app = express();

const port = 5000;
app.use(express.json());

app.use("/api/data", require("./routes/data.js"));
app.use("/api/quotes", require("./routes/quotes.js"));
app.use("/api/contact", require("./routes/contact.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
