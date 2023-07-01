const fs = require('fs');
const process = require('process');
const axios = require('axios');


function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      // console.log(data);
      let urls = data.split(/[ \r\n]+/);
      urls.forEach(webCat);
    }
  });
}


/** read page at URL and print it out. */

async function webCat(url) {
  try {
    let filename = url.split('/')[2]
    let resp = await axios.get(url);
    fs.writeFile(filename, resp.data, 'utf8', function (err) {
      if (err) {
        console.error(`Couldn't write ${url}: ${err}`);
      }
      console.log(`Wrote to ${filename}`);
    });
  } catch (err) {
    console.error(`Couldn't Download ${url}`);
  }
}


cat(process.argv[2]);