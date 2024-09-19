const express=require("express")
const cookie=require("cookie-parser")
const path=require("path")
const methodoverride=require("method-override")
const http=require("http")
const socketio=require("socket.io")
const connect = require("./config/db")
const URoute = require("./routes/user.route")
const ERoute = require("./routes/event.route")
require("dotenv").config()
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs")
app.set("views",(__dirname+"/views"))
app.use(cookie())
app.use(methodoverride("_method"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/user",URoute)
app.use("/event",ERoute)

const server = http.createServer(app);
const io = socketio(server);

app.use((req, res, next) => {
    req.io = io;
    next();
});
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


app.listen(process.env.PORT,()=>{
    console.log(`Server start ${process.env.PORT}`)
    connect()
})