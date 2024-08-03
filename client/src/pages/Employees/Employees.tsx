import { CustomBtn } from "../../components/custom-btn/Custom-btn";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { Navigate, useNavigate } from "react-router-dom";
import { Path } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";

const colums: ColumnsType<Employee> = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export const Employees = () => {
  const { data, isLoading } = useGetAllEmployeesQuery();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
    
    const goToAddUser = () => navigate(Path.employeeAdd)



  return (
    <Layout>
      <CustomBtn
        type="primary"
        onClick={goToAddUser}
        icon={<PlusCircleOutlined />}
      >
        Add
      </CustomBtn>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={colums}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Path.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
