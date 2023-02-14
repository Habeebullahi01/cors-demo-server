import express from "express";
import cors from "cors";
import { domains } from "./origins/origins";

const app = express();
// app.use(cors());
app.get("/", (req, res) => {
  res.send("CORS Demonstration!");
});

app.get("/universal-allow", cors({ origin: "*" }), (req, res) => {
  res.send(
    "This page can be accesed from any origin. Without any confrontation. Just like leaving the bank door open , without the guard on site."
  );
});

app.get(
  "/possible-site-level-access",
  cors({ origin: "domains.com" }),
  (req, res) => {
    // res.send(
    //   "This page and can be accessed by all the domains in the origins.ts file"
    // );
    // res.send(req.path);
    res.send(req.headers.origin);
  }
);
app.put("/possible-site-level-access", cors({ origin: true }), (req, res) => {
  // res.send(
  //   "This page and can be accessed by all the domains in the origins.ts file"
  // );
  // res.send(req.path);
  res.json({ msg: req.headers.origin });
});

app.listen(4000, () => {
  console.log("CORS demonstration server is running.");
});
