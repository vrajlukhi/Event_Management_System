const jwt = require("jsonwebtoken");
const userModel = require("../models/user.schema");

const signupui = async (req, res) => {
    try {
        res.render("signup");
    } catch (error) {
        console.error("Error rendering signup UI:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const signup = async (req, res) => {
    try {
        let { email } = req.body;
        let userdata = await userModel.findOne({ email: email });

        if (!userdata) {
            let newuser = await userModel.create(req.body);
            res.redirect("/user/login");
        } else {
            res.redirect("/user/login");
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const loginui = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.error("Error rendering login UI:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let userdata = await userModel.findOne({ email: email });

        if (userdata) {
            if (userdata.password === password) {
                let token = jwt.sign({ id: userdata._id }, 'pass'); 
                res.cookie("token", token, { httpOnly: true });
                res.redirect("/event/home")
            } else {
                res.status(401).json("Password is wrong");
            }
        } else {
            res.redirect("/user/signup");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { signupui, signup, loginui, login };
