import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Path } from "./paths";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Auth } from "./features/auth/Auth";
import { Employees } from "./pages/Employees/Employees";
import { AddEmployee } from "./pages/AddEmployee/AddEmployee";
import { Status } from "./pages/Status/Status";
import { Employee } from "./pages/Employee/Employee";
import { EditEmployee } from "./pages/EditEmoloyee/EditEmployee";

const router = createBrowserRouter([
  {
    path: Path.home,
    element: <Employees />,
  },
  {
    path: Path.login,
    element: <Login />,
  },
  {
    path: Path.register,
    element: <Register />,
  },
  {
    path: Path.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Path.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Path.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Path.employeeEdit}/:id`,
    element: <EditEmployee />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
