const {Router} = require('express');
const { Auth } = require('../middleware/auth');
const multer=require("multer");
const path=require("path")
const { createUi, createEvent, home, rsvpdata, deletedata, editdata, updatedata } = require('../controllers/event.controller');
const ERoute =Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + path.extname(file.originalname))
});
const upload = multer({ storage });


ERoute.get('/home', Auth, home);
ERoute.get('/create', Auth, createUi);

ERoute.post('/create',upload.single('image'),Auth,createEvent);
ERoute.post("/RSPV/:id",Auth,rsvpdata)
ERoute.delete("/:id",Auth,deletedata);
ERoute.get("/:id/edit",Auth,editdata);

ERoute.patch("/:id/",Auth,updatedata);

module.exports=ERoute