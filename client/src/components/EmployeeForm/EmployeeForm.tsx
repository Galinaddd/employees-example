import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { CustomInput } from "../custom-input/CustomInput";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { CustomBtn } from "../custom-btn/Custom-btn";

type Props<T> = {
  onFinish: (value: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};

export const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="emp;oyee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="firstName" placeholder="Name" />
        <CustomInput type="text" name="lastName" placeholder="Name" />
        <CustomInput type="number" name="age" placeholder="Age" />
        <CustomInput type="text" name="address" placeholder="Address" />
        <Space>
          <ErrorMessage message={error} />
          <CustomBtn htmlType="submit">{btnText}</CustomBtn>
        </Space>
      </Form>
    </Card>
  );
};
