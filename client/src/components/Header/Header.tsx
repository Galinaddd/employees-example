import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { Path } from "../../paths";
import { CustomBtn } from "../custom-btn/Custom-btn";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Path.home}>
          <CustomBtn type="default">
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomBtn>
        </Link>
      </Space>
      <Space>
        <Link to={Path.register}>
          <CustomBtn icon={<UserOutlined />}>Sign up</CustomBtn>
        </Link>
        <Link to={Path.login}>
          <CustomBtn icon={<LoginOutlined />}>Sign in</CustomBtn>
        </Link>
      </Space>
    </Layout.Header>
  );
};
