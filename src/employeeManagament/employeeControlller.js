import Employee from "./EmployeeModel.js";


const allEmployees = async (page, limit, sortBy, filter, context) => {
    try {
        if (context.user.role !== 'admin') {
            throw new Error('Access Denied. You must be an admin to view employees.');
        }
        const skip = (page - 1) * limit;
        const query = {};
        if (filter) {
            if (filter.name) query.name = { $regex: filter.name, $options: "i" };
            if (filter.age) query.age = filter.age;
            if (filter.class) query.class = filter.class;
        }

        const sort = {};
        sort[sortBy] = 1; // Ascending order by default
        let data = await Employee.find(query).skip(skip).limit(limit).sort(sort);
        return data;

    } catch (error) {
        throw new Error('something went wrong.');
    }

};


const employeeById = async (id) => {
    try {
        return await Employee.findById(id);
    } catch (error) {
        throw new Error('something went wrong.');
    }
};


const addEmployee = async ({ name, age, class: employeeClass, subjects, attendance }) => {

    try {
        const newEmployee = new Employee({ name, age, class: employeeClass, subjects, attendance });
        await newEmployee.save();
        return newEmployee;
    } catch (error) {
        throw new Error('something went wrong.');

    }
};


const updateEmployee = async ({ id, name, age, class: employeeClass, subjects, attendance }) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, age, class: employeeClass, subjects, attendance }, { new: true });
        return updatedEmployee;
    } catch (error) {
        throw new Error('something went wrong.');
    }

};

export { allEmployees, employeeById, addEmployee, updateEmployee };
