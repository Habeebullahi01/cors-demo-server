import express from "express";
import cors from "cors";
import { whitelistedDomains } from "./origins/origins";

const app = express();
// app.use(cors());

const dynamicOrigin = {
  origin: function (origin: string | undefined, callback: Function) {
    if (origin && whitelistedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("This origin is not whitelisted."));
    }
  },
};

app.get("/", (req, res) => {
  res.send("CORS Demonstration! But you can't get this.");
});

app.get(
  "/universal-allow",
  cors({ origin: "*" }), // or just cors()
  (req, res) => {
    res.send(
      "This page can be accesed from any origin. Without any confrontation. Just like leaving the bank door open , without the guard on site."
    );
  }
);

app.get(
  "/single-domain-access",
  cors({ origin: "domains.com" }),
  (req, res) => {
    res.send("This page and can only be accessed by domains.com");
    // res.send(req.path);
    // res.send(req.headers.origin);
  }
);

app.get("/psla1", cors(dynamicOrigin), (req, res) => {
  res.send(
    "This page can be accessed by all the domains in the origins.ts file."
  );
  // res.send(req.path);
  // res.send(req.headers.origin);
});
app.get("/psla2", cors(dynamicOrigin), (req, res) => {
  res.send(
    "This page can be accessed by all the domains in the origins.ts file."
  );
  // res.send(req.path);
  // res.send(req.headers.origin);
});
app.get("/psla3", cors(dynamicOrigin), (req, res) => {
  res.send(
    "This page can be accessed by all the domains in the origins.ts file."
  );
});

app.get("/safer-domain-access", (req, res) => {
  res.send(
    "This page is only accesible by this domain because this domain is associated with it."
  );
});

app.listen(4000, () => {
  console.log("CORS demonstration server is running.");
});
