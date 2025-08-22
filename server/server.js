import "./env.js"; //importing the .env file.
import express from "express";
import db from "./database/init.js";
import MakeJWTRoute from "./JWT/route.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.post("/", (req, res) => {
  console.log(req.body["username"]);  
  res.status(200).send("good")}  
)

app.use("/jwt", MakeJWTRoute(db));


app.listen(PORT, () => {
  console.log(`Server is now open on http://localhost:${PORT}`)
}).on("error", (err)=> {
  console.log("server failed to start:\n", err)
})



