const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/User');
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment');
// const { $where } = require('./models/user');



// app.use(cors())
const corsOptions = {
    origin: '*',
    credential: true,
};

app.use(cors(corsOptions));

const connectDB = async() => {
    try {
       await mongoose.connect(process.env.MONGO_URL)
       console.log("database connection establish");
    } catch(err) {
      console.log("error");
    }
}

//middleware
dotenv.config()
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")))
console.log(cors())

app.use(cookieParser());
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)

//upload img
const storage = multer.diskStorage({
    destination:(req,file,fn) => {
        fn(null, "images")
    },
    filename: (req,file,fn) => {
        fn(null, req.body.img)
    }
})
const upload = multer({storage: storage})
app.post("api/upload", upload.single("file"), (req,res) => {
    res.status(200).json("Image uploaded")
})



app.get('/', (req, res) => {
    res.status(200).send('Server up and running')
  })
    
  const port = process.env.PORT ||3000; // Set the desired port number ;
  
  const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
      console.log(`Backend server is running on ${port}` );
    });
  };
  
  startServer();

// app.listen(process.env.PORT, () => {
//     connectDB();
//     console.log("app is listening on port" + process.env.PORT)
// })




