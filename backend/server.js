require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const authRoutes = require("../backend/routes/auth-routes.js")

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URL;

//cross platform manage
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);

//to parse json
app.use(express.json());

//Connect with database
mongoose.connect(MONGO_URI)
.then(()=> console.log("mongodb is connected"))
.catch((e)=> console.log(e));

//routes configuration
app.use("/auth", authRoutes);

//global error handler
app.use((err, req, res, next)=> {
    console.log(err.stack);
    res.status(500).json({
        success : false,
        message : 'Something went wrong'
    })
})


app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})