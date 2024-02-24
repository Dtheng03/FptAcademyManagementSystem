import React, { useState } from 'react';
import { Modal, Form, Input, Button, Checkbox, Radio, Select, Space, Flex, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Option } = Select;

const ImportSyllabusModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.fileList[0]);
  };

  const handleSelectButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
    // You can handle the form submission logic here
  };

  const formItemLayout = {};

  return (
    <>
      <Button
        icon={<UploadOutlined />}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          borderRadius: '12px',
          color: 'white',
          backgroundColor: '#D45B13',
          marginRight: '0.5rem',
        }}
        htmlType='submit'
      >
        Import
      </Button>
      <Modal
        style={{
          width: '40rem',
        }}
        bodyStyle={{ padding: '0' }}
        title={
          <Typography style={{ color: 'white', textAlign: 'center' }}>Import Syllabus</Typography>
        }
        open={isOpen}
        onCancel={() => {
          setIsOpen(!isOpen);
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          style={{ padding: '1rem' }}
          form={form}
          onFinish={handleFormSubmit}
          layout='horizontal'
        >
          <Flex gap={18} justify='space-between' style={{ width: '100%' }}>
            <Typography>Import settings</Typography>
            <Flex style={{ width: '20rem' }} vertical justify='space-around'>
              <Form.Item label='File (csv)*' {...formItemLayout}>
                <Space align='start'>
                  <Form.Item
                    name='file'
                    // valuePropName='fileList'
                    getValueFromEvent={handleFileChange}
                    noStyle
                  >
                    <Input type='file' style={{ display: 'none' }} />
                  </Form.Item>
                  <Button
                    style={{
                      color: 'white',
                      backgroundColor: '#2D3748',
                      padding: '0 2rem',
                    }}
                    size='small'
                    // onClick={handleSelectButtonClick}
                  >
                    Select
                  </Button>
                </Space>
              </Form.Item>
              <Form.Item label='Encoding type' {...formItemLayout}>
                <Select placeholder='Auto detect' size='small' style={{ width: 120 }} />
              </Form.Item>
              <Form.Item label='Column separator' {...formItemLayout}>
                <Select placeholder='Comma' size='small' style={{ width: 120 }} />
              </Form.Item>
              <Form.Item label='Import template' {...formItemLayout}>
                <Link
                  to='download'
                  style={{ textDecoration: 'underline', color: '#285D9A' }}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Download
                </Link>
              </Form.Item>
            </Flex>
          </Flex>
          <hr style={{ margin: '10px 0' }} />
          <Space direction='vertical' style={{ width: '100%' }}>
            <Typography>Duplicate</Typography>
            <Flex style={{ marginLeft: '6rem' }} vertical>
              <Form.Item label='Duplicate control' {...formItemLayout}>
                <Space align='start'>
                  <Form.Item name='scanning' valuePropName='checked' noStyle>
                    <Checkbox.Group options={['Syllabus code', 'Syllabus name']} />
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item label='Duplicate handle' {...formItemLayout}>
                <Form.Item name='duplicateHandle' initialValue='2' noStyle>
                  <Radio.Group>
                    <Radio value='1'>Allow</Radio>
                    <Radio value='2'>Replace</Radio>
                    <Radio value='3'>Skip</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form.Item>
            </Flex>
          </Space>
          <hr style={{ margin: '10px 0' }} />
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              type='primary'
              htmlType='submit'
              style={{
                borderRadius: '10px',
                padding: '0.5rem 1.5rem',
                color: 'white',
                backgroundColor: '#2D3748',
              }}
            >
              Cancel
            </Button>
            <Button
              type='primary'
              htmlType='submit'
              style={{
                borderRadius: '10px',
                padding: '0.5rem 1.5rem',
                color: 'white',
                backgroundColor: '#2D3748',
              }}
            >
              Import
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ImportSyllabusModal;
