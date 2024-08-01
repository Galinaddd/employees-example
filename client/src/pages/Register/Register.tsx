import { Card, Form, Row, Space, Typography } from "antd";
import { Layout } from "../../components/Layout/Layout";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { PasswordInput } from "../../components/password-input/PasswordInput";
import { CustomBtn } from "../../components/custom-btn/Custom-btn";
import { Link } from "react-router-dom";
import { Path } from "../../paths";
export const Register = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Sign UP" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
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
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
