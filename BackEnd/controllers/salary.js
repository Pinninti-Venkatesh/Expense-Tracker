const Salary = require("../models/salary");
const { response } = require("../mods/response");

exports.addSalary = (req, res) => {
  const salary = new Salary(req.body);
  salary.save((err, salary) => {
    if (!err) {
      return res
        .status(200)
        .json(response("S", "salary saved", "salary", salary));
    }
    return res
      .status(500)
      .json(response("E", "Unable to Save salary", "Err", err));
  });
};

exports.removeSalary = (req, res) => {
  Salary.findOneAndDelete({_id:req.body.id}, { sort: { createdAt: -1 } }, (err, ctc) => {
    if (!err) {
      return res.status(200).json(response("S", "salary deleted"));
    }
    return res
      .status(500)
      .json(response("E", "Unable to delete salary", "Err", err));
  });
};

exports.getAllSalary = (req, res) => {
    CTC.find().exec((err, allSalary) => {
      if (!err) {
        return res.status(200).json(response("S", "got all salary", "salary", allSalary));
      }
      return res
        .status(500)
        .json(response("E", "Unable to get all salary", "Err", err));
    });
  };
