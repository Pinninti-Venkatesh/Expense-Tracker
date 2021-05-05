// const { response } = require("../mods/response");
const CTC = require("../models/CTC");

const formidable = require("formidable");
const fs = require("fs");
// const { response } = require("../mods/response");

exports.addCTC = (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log('inside formidable ctc');
      if (err) {
        res.status(400).json({ err: 'error with the image' });
        throw err
      }
      const ctc = new CTC(fields);
      // let salary = new Salary(fields);
      if (files.doc) {
        if (files.doc.size > 3000000) {
          return res.status(400).json({
            err: "file size too big",
          });
        }
        ctc.doc.data = fs.readFileSync(files.doc.path);
        ctc.doc.contentType = files.doc.type;
        ctc.save((err, ctc) => {
          if (!err) {
            return res
              .status(200)
              .json({ response: ctc });
          }
          return res
            .status(500)
            .json({ response: err });
        });
      }

    });
  } catch (error) {
    console.log('error in addCTC', error);
    return res
      .status(500)
      .json({ response: error });
  }
};

exports.removeCTC = (req, res) => {
  CTC.findOneAndDelete(
    { _id: req.body.id },
    { sort: { createdAt: -1 } },
    (err, ctc) => {
      if (!err) {
        return res.status(200).json(response("S", "ctc deleted"));
      }
      return res
        .status(500)
        .json({response:err});
    }
  );
};

exports.getAllCTC = (req, res) => {
  CTC.find().exec((err, allctc) => {
    if (!err) {
      return res.status(200).json({response:allctc});
    }
    return res
      .status(500)
      .json({response:err});
  });
};
