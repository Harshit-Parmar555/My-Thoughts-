const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const connecttodb = require("./Connect-Database/connect");
const userrouter = require("./Routes/userroute");
const postrouter = require("./Routes/postroute");
const cookieparser = require("cookie-parser");
const path = require("path");



const _dirname = path.resolve();
// MiddleWares

app.use(morgan());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());
dotenv.config();



// Port
const port = process.env.PORT;

// Connec to DataBase
connecttodb();

// Api's
app.use("/api/v1/user", userrouter);
app.use("/api/v1/post", postrouter);

app.use(express.static(path.join(_dirname , "/Frontend/dist")));
app.get("*"  , (req,res)=>{
  res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
