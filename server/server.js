import "./env.js"; //importing the .env file.
import db from "./database/init.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import MakeJWTRoute from "./JWT/route.js";


const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true //able to recieve cookies
}));

app.use(cookieParser());

//TODO: remove in production
app.use((req, res, next) => {
  const oldSend = res.send;

  res.send = function (body) {
    console.log(`Response to ${req.method} ${req.url}:`, body);
    return oldSend.call(this, body);
  };

  next();
});

app.use(express.json());
app.use("/jwt", MakeJWTRoute(db));

app.listen(PORT, () => {
  console.log(`Server is now open on http://localhost:${PORT}`);
}).on("error", (err)=> {
  console.log("server failed to start:\n", err)
})



