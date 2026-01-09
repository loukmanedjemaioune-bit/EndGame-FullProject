const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const wordRoutes = require("./routes/word.router");
app.use("/api/word", wordRoutes);
const scoreRoutes = require("./routes/score.routes");
app.use("/api/score", scoreRoutes);
const LoginAdminRoutes = require("./routes/authAdmin.routes");
app.use("/api/admin", LoginAdminRoutes);
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
