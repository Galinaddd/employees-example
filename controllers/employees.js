const { prisma } = require("../prisma/prisma-client");
/**
  |============================
  | @router GET /api/employees
  @desc get all employees
  @access Private
  |============================
*/
const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "something was wrong" });
  }
};

/**
  |============================
   @router POST /api/employees/add
  @desc add employee
  @access Private
  |============================
*/
const addEmployee = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age)
      return res.status(400).json({ massage: "all field are required" });

    // const employee = await prisma.employee.create({
    //   data: {
    //     ...data,
    //     userId: req.user.id,
    //   },
    // });

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
    return res.staus(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/**
  |============================
   @router DELETE /api/employees/:id
  @desc remove employee
  @access Private
  |============================
*/

const removeEmployee = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.employee.delete({
      where: { id },
    });
    res.status(204).json("OK");
  } catch (error) {
    res.status(500).json({ message: "faild to delete" });
  }
};

/**
  |============================
   @router PUT /api/employees/:id
  @desc edit employee
  @access Private
  |============================
*/

const editEmployee = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  console.log(id);
  try {
    await prisma.employee.update({
      where: { id },
      data,
    });

    res.status(204).json("OK");
  } catch (error) {
    res.status(500).json({ message: "faild to edit" });
  }
};

/**
  |============================
   @router GET /api/employees/:id
  @desc get employee
  @access Private
  |============================
*/
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({ where: { id } });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "faild to get employee" });
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  removeEmployee,
  editEmployee,
  getEmployee,
};
