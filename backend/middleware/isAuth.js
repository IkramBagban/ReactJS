const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization Denied.", success: false });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "mysecretkey");
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Authorization Denied.", success: false });
  }
};
