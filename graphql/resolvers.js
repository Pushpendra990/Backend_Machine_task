
import { login, signup } from "../src/authorization/authController.js";
import { addEmployee, allEmployees, employeeById, updateEmployee } from "../src/employeeManagament/employeeControlller.js";


export const root = {

  //---------authorization--------------------------------------
  signup: async ({email, password, role})=>{return await signup(email, password, role)},
  login:  async ( { email, password }) => {return await login(email,password)},

//----------employee---------------------------------------------
  employees: async ({ page = 1, limit = 10, sortBy = "name", filter }, context) => {
    return await allEmployees(page,limit,sortBy,filter,context)
  },

  employee: async ({ id }) => { return await employeeById(id) },

  addEmployee: async ({ name, age, class:employeeClass, subjects, attendance }) => {
    return await addEmployee({name, age, class:employeeClass, subjects, attendance})
  },

  updateEmployee: async ({ id, name, age, class: employeeClass, subjects, attendance }) => {
    
    return await updateEmployee({ id, name, age, class: employeeClass, subjects, attendance })
  },



};
