#!/usr/bin/env node
/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */

var fs = require("fs"),
  path = require("path");
var express = require("express"),
  app = express();
var sprintf = require("printj").sprintf;
var logit = require("./_logit");
var cors = require("cors");
var XLSX = require("xlsx");

var port = +process.argv[2] || +process.env.PORT || 7266;
var basepath = process.cwd();
var data = "a,b,c\n1,2,3".split("\n").map(function(x) {
  return x.split(",");
});
var dir = path.join(__dirname, "files");
try {
  fs.mkdirSync(dir);
} catch (e) {}

app.use(logit.mw);
app.use(cors());
app.use(require("express-formidable")({ uploadDir: dir }));

app.post("/", function(req, res) {
  var ws = XLSX.utils.aoa_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
  res.status(200).send(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
});

app.use(express.static(path.resolve(basepath)));
app.use(require("serve-index")(basepath, { icons: true }));

app.listen(port, function() {
  console.log("Serving HTTP on port " + port);
});
