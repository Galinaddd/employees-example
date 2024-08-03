import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../paths";
import { CustomBtn } from "../custom-btn/Custom-btn";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

export const Header = () => {
  const user = useSelector(selectUser);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    // navigate("/login");
  };

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
      {user ? (
        <CustomBtn icon={<LogoutOutlined />} onClick={onLogoutClick}>
          Log out
        </CustomBtn>
      ) : (
        <Space>
          <Link to={Path.register}>
            <CustomBtn icon={<UserOutlined />}>Sign up</CustomBtn>
          </Link>
          <Link to={Path.login}>
            <CustomBtn icon={<LoginOutlined />}>Sign in</CustomBtn>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
