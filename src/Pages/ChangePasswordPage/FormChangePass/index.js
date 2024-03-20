import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from "./FormChangePass.module.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const FormChangePass = () => (
    <div className={cx("wrapper")}>
        <Form
            className={cx("form")}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                className={cx("item")}
                name="cur-pass"
                rules={[
                    {
                        required: true,
                        message: 'Please enter current password!',
                    },
                ]}
            >
                <Input.Password
                    className={cx("input")}
                    placeholder='Current password'
                    maxLength={12}
                />
            </Form.Item>

            <Form.Item
                className={cx("item")}
                name="new-pass"
                rules={[
                    {
                        required: true,
                        message: 'Please enter new password!',
                    },
                ]}
            >
                <Input.Password
                    className={cx("input")}
                    placeholder='New password'
                    maxLength={12}
                />
            </Form.Item>

            <Form.Item
                className={cx("item")}
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please re-enter new password!',
                    },
                ]}
            >
                <Input.Password
                    className={cx("input")}
                    placeholder='Re-enter new password'
                    maxLength={12}
                />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit" className={cx("btn")}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
);
export default FormChangePass;