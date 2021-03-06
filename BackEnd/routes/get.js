const express = require("express");
const { isSignedIn } = require("../controllers/auth");

const {
  getTotalSavings,
  getDailyExpenses,
  getMonthlyExpenses,
  getTotalExpenses,
  getTotalExpensesCategorically,
  getWeeklyExpenses,
  getDailyExpensesCategorically,
  getWeeklyExpensesCategorically,
  getMonthlyExpensesCategorically,
  getBalance,
  getBills
} = require("../controllers/get");
const { nextPayDate } = require("../mods/nextPayDate");

const router = express.Router();

router.get("/totalSavings", isSignedIn, getTotalSavings);
router.get("/getBalance",isSignedIn,getBalance);
//Expenses

router.get("/totalExpenses",isSignedIn,getTotalExpenses);
router.get("/dailyExpenses",isSignedIn,getDailyExpenses);
router.get("/weeklyExpenses",isSignedIn,getWeeklyExpenses);
router.get("/monthlyExpenses",isSignedIn,getMonthlyExpenses);

//Categorical Expenses

router.get("/totalCagExpenses",isSignedIn,getTotalExpensesCategorically);
router.get("/dailyCagExpenses",isSignedIn,getDailyExpensesCategorically);
router.get("/weeklyCagExpenses",isSignedIn,getWeeklyExpensesCategorically);
router.get("/monthlyCagExpenses",isSignedIn,getMonthlyExpensesCategorically);

router.get("/nextPayDay",isSignedIn,nextPayDate);

router.get("/Bills",getBills);

module.exports = router;
