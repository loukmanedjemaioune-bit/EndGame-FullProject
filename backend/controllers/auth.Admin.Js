const poolPromise = require("../config/db.config");
const jwt = require("jsonwebtoken");

exports.AdminLog = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { username, password } = req.body;
    const result = await pool
      .request()
      .input("username", username)
      .query("select *from Admin where username = @username");
    const Admin = result.recordset[0];
    if (!Admin) {
      return res
        .status(404)
        .json({ message: "No Admin With This Information" });
    }

    const isPassValid = Admin.password === password;
    if (!isPassValid) {
      console.log(password);
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: Admin.id },
      process.env.JWT_SECRET || "ENDGAMEADMIN_SECRET",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.allAdmins = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select *from Admin");
    const Admins = result.recordset;
    if (!Admins) {
      res.status(404).json({ message: "No Admins" });
    }
    res.status(201).json({ Admins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
