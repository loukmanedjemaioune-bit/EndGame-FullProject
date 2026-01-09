const poolPromise = require("../config/db.config");

exports.getAllWords = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select *from words");
    res.json(result.recordset);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.getWordByCategory = async (req, res) => {
  try {
    const { Category } = req.params;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("Category", Category)
      .query(
        "select top 1 word from words where Category = @Category order by NewID()"
      );
    const word = result.recordset[0].word;
    if (word.length === 0) {
      return res.status(404).send({ message: "No Words to show" });
    }
    /*  const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex].Word; */
    res.send(word);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const pool = await poolPromise;
    const AllCategories = await pool
      .request()
      .query("select distinct Category from Words");
    res.status(200).json(AllCategories.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
