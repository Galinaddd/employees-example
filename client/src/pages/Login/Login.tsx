import { Card, Form, Row, Space, Typography } from "antd";
import { Layout } from "../../components/Layout/Layout";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { PasswordInput } from "../../components/password-input/PasswordInput";
import { CustomBtn } from "../../components/custom-btn/Custom-btn";
import { Link } from "react-router-dom";
import { Path } from "../../paths";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { log } from "console";

export const Login = () => {
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState("");

  const onLogin = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
    } catch (error) {
      console.log(error);
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Unknown message: ");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Sign in" style={{ width: "30rem" }}>
          <Form onFinish={onLogin}>
            <CustomInput name="email" type="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomBtn type="primary" htmlType="submit">
              Sign in
            </CustomBtn>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Haven`t account yet? <Link to={Path.register}>Sign up</Link>{" "}
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
