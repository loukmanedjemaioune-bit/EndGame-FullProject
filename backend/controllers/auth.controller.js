const sql = require("mssql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const poolPromise = require("../config/db.config");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const pool = await poolPromise;
    const user = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword)
      .output("Id", sql.Int)
      .execute("AddNewUser");

    res.status(201).json({
      message: "User registered successfully",
      userId: user.output.Id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT TOP 1 * FROM Users WHERE email=@email");

    const user = result.recordset[0];
    if (!user) return res.status(404).json({ message: "User not found" });

    /*     const isPasswordValid = bcrypt.compareSync(password, user.password);//the true method in the project
     */ const isPasswordValid = password === user.password; // just for testing manual adding user
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "ENDGAME_SECRET",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
    /* res.json({ message: "Login successful", token }); */
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.UpdatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Password", sql.NVarChar, hashedPassword)
      .input("Id", sql.Int, id)
      .execute("SP_UpdateUserPass");
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.Delete = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Id", sql.Int, id)
      .query("DELETE FROM Users WHERE id=@Id");
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.allUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select *from Users");
    const Users = result.recordset;
    if (!Users) {
      res.status(404).json({ message: "No Users" });
    }
    res.status(201).json({ Users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.UpdateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("Id", sql.Int, id)
      .execute("SP_UpdateUserEmail");
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* exports.AddUser=async(req,res)=> {

} */
