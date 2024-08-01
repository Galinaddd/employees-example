const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getAllEmployees,
  addEmployee,
  removeEmployee,
  editEmployee,
  getEmployee,
} = require("../controllers/employees");

router.get("/", auth, getAllEmployees);
router.get("/:id", auth, getEmployee);
router.post("/add", auth, addEmployee);
router.delete("/:id", auth, removeEmployee);
router.put("/:id", auth, editEmployee);

module.exports = router;
