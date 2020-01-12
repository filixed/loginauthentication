const express = require('express')

const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()


const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')



dotenv.config();

//con to db



mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log('DB connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });


app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute)

 app.listen(3000, () => console.log("Server started..."))