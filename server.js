const express = require('express');
const testRouter = require('./routers/testrouter');
const signUpRouter = require('./routers/signuprouter');
const loginRouter = require('./routers/loginrouter');
const getAllUsersRouter = require('./routers/getallusersrouter');
const updateUserRouter = require('./routers/updateuserrouter');
const deleteUserRouter = require('./routers/deleteuserrouter');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();    
});

app.use('/',testRouter);
app.use('/signup',signUpRouter);
app.use('/login',loginRouter);
app.use('/updateuser',updateUserRouter);
app.use('/deleteuser',deleteUserRouter);
app.use('/getallusers',getAllUsersRouter);

app.listen(3000,()=>{
    console.log("My server listening on port 3000...");
});