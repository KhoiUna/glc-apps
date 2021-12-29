require("dotenv").config();
const saveStudent = require("../../utils/saveStudent");

//array of string
let names = [];

const main = () => {
  names.forEach((name) => {
    if (name.split(" ").length > 1) saveStudent({ fullName: name });
  });
};
main();
