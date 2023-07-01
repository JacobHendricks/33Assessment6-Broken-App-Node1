const express = require('express');
const axios = require('axios');
const app = express();
const ExpressError = require("./expressError")
const morgan = require("morgan")

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send("HOMEPAGE!!!!!")
})

// app.post('/', function(req, res, next) {
//   try {
//     if (!req.body.developers) throw new ExpressError("Name is required", 400)
//     let results = req.body.developers.map(async d => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

//     return res.send(JSON.stringify(out));
//   } catch (err) {
//     next(err);
//   }
// });

async function getDevBio(name) {
  let results = await axios.get(`https://api.github.com/users/${name}`);
  // console.log("RESULTS", results);
  return results.data
}


app.post('/', async function(req, res, next) {
  try {
    if (!req.body.developers) throw new ExpressError("Name is required", 400)
    let results = await Promise.all(req.body.developers.map(async name => {
      return getDevBio(name);
    }));
    let out = results.map(r => ({ "name": r.name, "bio": r.bio }));
    return res.send(JSON.stringify(out));
  } catch (err) {
    return next(err);
  }
});



/** 404 handler */

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;
