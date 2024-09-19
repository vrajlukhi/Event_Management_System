const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
    let { token } = req.cookies
      
    if (token) {
      let decode = jwt.verify(token, "pass");
      req.body.userID = decode.id
      
      next();
    } else {
      res.redirect("/user/login");
    }
  };



module.exports = {Auth};