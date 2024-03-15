import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./api";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn && JSON.parse(isLoggedIn)) {
      navigate("/home");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const { user } = await loginUser(values.email, values.password);

      if (user) {
        if (user.status === "Active") {
          onLogin(user);
          sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
          navigate("/home");
        } else {
          message.error("Your account has been locked");
        }
      }
      else {
        message.error("Incorrect email or password. Please try againnn");
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("An error occurred during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} size="large">
      <div className="login-container">
        <div className="login-tilte">
          <div className="wrapper">
            <img
              src="/fptLogo.png"
              style={{ width: "50%", height: "auto" }}
              alt="FPT Logo"
            />
            <h3>
              FPT Fresh Academy Training<br></br>Management System
            </h3>
          </div>
        </div>
        <div className="login-content">
          <Form
            className="login-form"
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              className="login-label"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                className="login-input"
                prefix={<UserOutlined />}
                placeholder="Email"
                type="email"
                autoFocus
                maxLength={40}
              />
            </Form.Item>
            <Form.Item
              className="login-label"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                className="login-input"
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                maxLength={12}
              />
            </Form.Item>
            <Form.Item className="login-label">
              <Button
                style={{ marginTop: "28px", height: "48px" }}
                className="login-input"
                type="primary"
                block
                htmlType="submit"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
