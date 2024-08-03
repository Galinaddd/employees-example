// import { User } from "@prisma/client";
import { Employee } from "@prisma/client";
import { api } from "./api";

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),

    getEmployee: builder.query<Employee, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),

    editEmployee: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/employees/${employee.id}`,
        method: "PUT",
        body: employee,
      }),
    }),

    removeEmployee: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/{id}`,
        method: "DELETE",
        body: { id },
      }),
    }),

    addEmployee: builder.mutation<Employee, Employee>({
      query: (employye) => ({
        url: `/employees/add`,
        method: "POST",
        body: employye,
      }),
    }),
  }),
});

export const {
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} = employeesApi;

export const {
  endpoints: {
    getAllEmployees,
    getEmployee,
    editEmployee,
    removeEmployee,
    addEmployee,
  },
} = employeesApi;
