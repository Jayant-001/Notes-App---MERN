const connectToMonoose = require("./db");
const express = require("express");

connectToMonoose();

const app = express();
const port = 5000;
// middleware
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Datos app listening on port ${port}`);
});
