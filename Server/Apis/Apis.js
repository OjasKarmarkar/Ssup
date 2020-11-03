const secret = require("../Configs/secret");
User = require("../Models/User");
Chats = require("../Models/Chats")
bcrypt = require("bcryptjs");
jwt = require("jsonwebtoken");
var _ = require("lodash");

function genSalt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        reject(err);
      } else {
        resolve({
          salt: salt,
          password: password,
        });
      }
    });
  });
}

function comparPassword(password, storedPwd) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, storedPwd, function (err, verified) {
      if (err) {
        reject(err);
      } else {
        resolve({
          isCorrect: verified,
        });
      }
    });
  });
}

// hash the password with the salt
function genHash(salt, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve({
          salt: salt,
          password: password,
          hash: hash,
        });
      }
    });
  });
}

login = async (req, res) => {
  console.log(req.body);
  if (req.body.email != null && req.body.password != null) {
    User.findOne({ email: req.body.email })
      .then(async (user) => {
        console.log(user);
        if (user) {
          comparPassword(req.body.password, user.password).then((result) => {
            if (result.isCorrect) {
                const token = jwt.sign(
                  {
                    _id: user.email,
                    name: user.name,
                  },
                  secret.JWT.secret,
                  { expiresIn: "15m" }
                );
                return res
                  .cookie("token", token, { httpOnly: true , sameSite: 'none', secure: true })
                  .send(_.pick(user, ["_id", "name", "role"]));
            } else {
              return res.status(400).send("Password is incorrect");
            }
          });
        } else {
          return res
            .status(200)
            .json({ email: "User Doesn't Exist , Please Register" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send("User Doesnt Exist");
      });
  } else {
    return res.status(400).send("Wrong Data");
  }
};

register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      error,
      message: "Provide Mail And Password!",
    });
  } else {
    const body = req.body;
    genSalt(body.password)
      .then(function (result) {
        return genHash(result.salt, result.password);
      })
      .then(function (result) {
        console.log("store hash in user profile :", result);
        var newUser = new User({
          email: body.email,
          password: result.hash,
          name: body.name,
          createdAt: Date.now(),
        });
        newUser.save(function (err) {
          if (!err) {
            return res.send({ status: "User created" });
          } else {
            if (err.name == "ValidationError") {
              res.statusCode = 400;
              res.send({ error: "Bad Request" });
            } else {
              res.statusCode = 500;
              res.send({ error: "Internal Server Error" });
            }
          }
        });
      })
      .catch(function (err) {
        return res.status(400).send("Error Hashing Password");
      });
  }
};

logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.send({ success: true });
};

fetchChats = async (req, res) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).send("Access denied...No token provided...");
  try {
    const decoded = jwt.verify(token, secret.JWT.secret);
    const email = decoded._id;
    var finalChats = [];
    Chats.find({participants : email} , function(err , chats){
      if(err){
        return res.status(500).send("Internal Server Error")
      }
      Array.prototype.push.apply(finalChats, chats);
    }).then(
      function (result){
        console.log(finalChats)
        return res.status(200).send({data:finalChats , user:decoded});
      }
    ).catch((err)=>{
      console.log(err)
    })
    
  } catch (er) {
    res.clearCookie("token");
    return res.status(400).send(er.message);
  }
};

fetchSingleChat = async (req, res) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).send("Access denied...No token provided...");
  try {
    const decoded = jwt.verify(token, secret.JWT.secret);
    Chats.findById(req.body.id, function (err, chat) {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      } else {
        return res.status(200).send(chat);
      }
    });
    
  } catch (er) {
    res.clearCookie("token");
    return res.status(400).send(er.message);
  }
};

module.exports = {
  login,
  register,
  logoutUser,
  fetchChats,
  fetchSingleChat
};
