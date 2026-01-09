const sql = require("mssql");
const poolPromise = require("../config/db.config");

exports.GetScore = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    const result = await pool
      .request()
      .input("id", id)
      .query("select score from Users where id = @id");
    res.status(200).send(result.recordset[0].score);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.UpdateScore = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    const { score } = req.body;
    const result = await pool
      .request()
      .input("id", id)
      .input("score", score)
      .query("Update Users set score = @score  where id = @id");
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Update Score Succsusfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
