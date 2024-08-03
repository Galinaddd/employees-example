import { Card, Form, Row, Space, Typography } from "antd";
import { Layout } from "../../components/Layout/Layout";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { PasswordInput } from "../../components/password-input/PasswordInput";
import { CustomBtn } from "../../components/custom-btn/Custom-btn";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onRegister = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap;
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Uknown message");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Sign UP" style={{ width: "30rem" }}>
          <Form onFinish={onRegister}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput name="email" type="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <CustomBtn type="primary" htmlType="submit">
              Sign in
            </CustomBtn>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Have already registered? <Link to={Path.login}>Sign in</Link>{" "}
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
