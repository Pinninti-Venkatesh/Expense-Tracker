const { response } = require("../mods/response");
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
          return res.status(200).json(response("S", "ctc saved", "ctc", ctc));
        }
        return res
          .status(500)
          .json(response("E", "Unable to Save ctc", "Err", err));
      });
    }
    return res
      .status(500)
      .json(response("E", "Failed to update previous ctc", "Err", err));
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
        .json(response("E", "Unable to delete ctc", "Err", err));
    }
  );
};

exports.getAllCTC = (req, res) => {
  CTC.find().exec((err, allctc) => {
    if (!err) {
      return res.status(200).json(response("S", "got all ctc", "ctc", allctc));
    }
    return res
      .status(500)
      .json(response("E", "Unable to get all ctc", "Err", err));
  });
};
