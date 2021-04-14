const Salary = require("../models/salary");
// const { response } = require("../mods/response");

exports.addSalary = (req, res) => {
  const salary = new Salary(req.body);
  salary.save((err, salary) => {
    if (!err) {
      return res
        .status(200)
        .json({response:salary});
    }
    return res
      .status(500)
      .json({response:err});
  });
};

exports.removeSalary = (req, res) => {
  Salary.findOneAndDelete({_id:req.body.id}, { sort: { createdAt: -1 } }, (err, ctc) => {
    if (!err) {
      return res.status(200).json({response:'salary deleted'});
    }
    return res
      .status(500)
      .json({response:err});
  });
};

exports.getAllSalary = (req, res) => {
    CTC.find().exec((err, allSalary) => {
      if (!err) {
        return res.status(200).json({response:allSalary});
      }
      return res
        .status(500)
        .json({response:err});
    });
  };
