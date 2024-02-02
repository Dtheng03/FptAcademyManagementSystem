import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.css";
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
        message.error("Incorrect userName or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginContent">
        <div className="loginForm">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your userName!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
