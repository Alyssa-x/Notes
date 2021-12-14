const fs = require("fs");
const promisify = function (callback) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callback(...args, (err, value) => {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(value);
        }
      });
    });
  };
};
const read = promisify(fs.readFile);
read("t.txt", "utf-8").then(console.log(1)).catch(console.log(2));
