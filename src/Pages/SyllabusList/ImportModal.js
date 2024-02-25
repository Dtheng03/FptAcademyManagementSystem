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
          <Typography style={{ color: 'white', textAlign: 'center', fontSize: '16px' }}>
            Import Syllabus
          </Typography>
        }
        open={isOpen}
        onCancel={() => {
          setIsOpen(!isOpen);
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          style={{ padding: '1rem 1rem 4px 1rem' }}
          form={form}
          onFinish={handleFormSubmit}
          layout='horizontal'
        >
          <Flex gap={18} justify='space-between' style={{ width: '100%' }}>
            <Typography style={{ fontWeight: '700' }}>Import settings</Typography>
            <Flex style={{ width: '20rem' }} justify='space-around'>
              <Flex gap={20} vertical {...formItemLayout}>
                <p>
                  File (csv)<span style={{ color: 'red' }}>*</span>
                </p>
                <span>Encoding type</span>
                <span>Column separator</span>
                <span>Import template</span>
              </Flex>
              <Flex gap={18} vertical {...formItemLayout}>
                <p
                  style={{
                    width: '5rem',
                    color: 'white',
                    borderRadius: '6px',
                    textAlign: 'center',
                    backgroundColor: '#2D3748',
                  }}
                >
                  Select
                </p>
                <Select placeholder='Auto detect' size='small' />
                <Select placeholder='Comma' size='small' />
                <Link
                  to='download'
                  style={{ textDecoration: 'underline', color: '#285D9A' }}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Download
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <hr style={{ margin: '10px 0' }} />
          <Flex gap={'5rem'} style={{ width: '100%' }}>
            <Typography style={{ fontWeight: '700' }}>Duplicate control</Typography>
            <Flex gap={8} vertical>
              <Flex gap={6} vertical {...formItemLayout}>
                <p>Scanning</p>
                <Form.Item name='scanning' valuePropName='checked' noStyle>
                  <Checkbox.Group options={['Syllabus code', 'Syllabus name']} />
                </Form.Item>
              </Flex>
              <Flex gap={8} vertical>
                <p>Duplicate handle</p>
                <Form.Item name='duplicateHandle' initialValue='2' noStyle>
                  <Radio.Group>
                    <Radio value='1'>Allow</Radio>
                    <Radio value='2'>Replace</Radio>
                    <Radio value='3'>Skip</Radio>
                  </Radio.Group>
                </Form.Item>
              </Flex>
            </Flex>
          </Flex>
          <hr style={{ margin: '10px 0' }} />
          <Flex style={{ padding: '0.4rem 0' }} justify='flex-end' align='center'>
            <span
              onClick={() => setIsOpen(!isOpen)}
              style={{
                borderRadius: '10px',
                fontWeight: '600',
                padding: '0.5rem 1.5rem',
                color: '#E74A3B',
                textDecoration: 'underline',
              }}
            >
              Cancel
            </span>
            <Button
              type='primary'
              htmlType='submit'
              style={{
                borderRadius: '10px',
                color: 'white',
                padding: '0 1.4rem',
                backgroundColor: '#2D3748',
              }}
            >
              Import
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default ImportSyllabusModal;
