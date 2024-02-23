import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./api";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn && JSON.parse(isLoggedIn)) {
      navigate("/home");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const user = await loginUser(values.userName, values.password);

      if (user) {
        onLogin();
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        navigate("/home");
      } else {
        message.error("Incorrect email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-tilte">
        <h2>
          FPT Fresh Academy Training Management
        </h2>
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
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              className="login-input"
              prefix={<UserOutlined />}
              placeholder="Email"
              // type="email"
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
          <Form.Item
            className="login-label"
          >
            <Button
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
  );
};

export default Login;
