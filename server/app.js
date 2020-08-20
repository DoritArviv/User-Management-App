const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./DB/db');
const userRoute = require('./Routes/userRoute');
const postRoute = require('./Routes/postRoute');
const todotRoute = require('./Routes/todoRoute');

mongoose.Promise = global.Promise;

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true
}).then(()=> console.log('Connection To DB Established'))
.catch((error) => console.log(error));
// mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/users' ,userRoute);
app.use('/posts' ,postRoute);
app.use('/todos' ,todotRoute);



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});