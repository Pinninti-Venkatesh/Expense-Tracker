const Salary = require("../models/salary");
const formidable = require("formidable");
const fs = require("fs");
// const { response } = require("../mods/response");

exports.addSalary = (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log('inside formidable');

      if (err) {
        res.status(400).json({ err: 'error with the image' });
        throw err
      }
      let salary = new Salary(fields);
      if (files.doc) {
        if (files.doc.size > 3000000) {
          return res.status(400).json({
            err: "file size too big",
          });
        }
        salary.doc.data = fs.readFileSync(files.doc.path);
        salary.doc.contentType = files.doc.type;
        salary.save((err, salary) => {
          if (!err) {
            return res
              .status(200)
              .json({ response: salary });
          }
          return res
            .status(500)
            .json({ response: err });
        });
      }

    });
  } catch (error) {
    console.log('error in addSalary', error);
    return res
      .status(500)
      .json({ response: error });
  }
};

exports.removeSalary = (req, res) => {
  Salary.findOneAndDelete({ _id: req.body.id }, { sort: { createdAt: -1 } }, (err, ctc) => {
    if (!err) {
      return res.status(200).json({ response: 'salary deleted' });
    }
    return res
      .status(500)
      .json({ response: err });
  });
};

exports.getNetSalary = (req, res) => {
  Salary.findOne()
    .sort({ createdAt: -1 }).exec((err, salary) => {
      if (!err) {
        return res
          .status(200)
          .json({ response: salary.net_salary });
      }
      return res
        .status(500)
        .json({ response: err });
    })
}

exports.getAllSalary = (req, res) => {
  Salary.find().exec((err, allSalary) => {
    if (!err) {
      return res.status(200).json({ response: allSalary });
    }
    return res
      .status(500)
      .json({ response: err });
  });
};
