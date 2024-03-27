const jwt = require("jsonwebtoken");

const { BlackListModel } = require("../model/blacklist.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const mongoToken = await BlackListModel.findOne({ token });
    // console.log(mongoToken);

    if (mongoToken) {
      res.json({ masg: "Please Login!" });
    }

    jwt.verify(token, "masai", async (err, decoded) => {
      if (decoded) {
        // console.log(decoded);
        next();
      } else {
        res.status(401).json({ msg: "Token is not valid" });
      }
    });
  } else {
    res.json({ msg: "You are not Authorized" });
  }
};

module.exports = {
  auth,
};
