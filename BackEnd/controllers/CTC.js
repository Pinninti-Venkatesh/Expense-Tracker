// const { response } = require("../mods/response");
const CTC = require("../models/CTC");

exports.addCTC = (req, res) => {
  CTC.findOneAndUpdate(
    {},
    { to: req.body.from },
    { sort: { createdAt: -1 } }
  ).exec((err, ctc) => {
    if (!err) {
      const ctc = new CTC(req.body);
      ctc.save((err, ctc) => {
        if (!err) {
          return res.status(200).json({response:err});
        }
        return res
          .status(500)
          .json({response:err});
      });
    }
    return res
      .status(500)
      .json({response:err});
  });
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
