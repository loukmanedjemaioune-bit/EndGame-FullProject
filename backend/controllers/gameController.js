exports.status = (req, res) => {
  res.json({
    message: "EndGame API is running",
    userId: req.userId,
  });
};
