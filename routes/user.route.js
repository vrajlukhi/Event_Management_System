const {Router}=require("express")
const { signupui, signup, loginui, login } = require("../controllers/user.controller")
const URoute=Router()

URoute.get("/signup",signupui)
URoute.post("/signup",signup)
URoute.get("/login",loginui)
URoute.post("/login",login)

module.exports=URoute