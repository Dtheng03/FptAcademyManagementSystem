import React, { useRef, useState } from 'react';
import { Modal, Form, Input, Button, Checkbox, Radio, Select, Space, Flex, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const ImportSyllabusModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Directly access the selected file
    setSelectedFile(file);
  };

  const handleSelectButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImportAPI = async (requestBody) => {
    const response = await axios.post(
      `http://fams-group1-net03.ptbiology.com/api/syllabus/import-syllabus?scanningOption=${requestBody.scanningOption}&dupplicateOption=${requestBody.duplicateHandle}`,
      requestBody.file
    );
    return response;
  };

  // Handle Submit here!
  const handleFormSubmit = (values) => {
    // Check if a file has been selected
    if (!selectedFile) {
      console.log('Please select a file');
      return; // Exit early if no file is selected
    }

    // Check file size
    const maxFileSize = 25 * 1024 * 1024; // 25MB
    if (selectedFile.size > maxFileSize) {
      console.error(
        'File size exceeds the maximum allowed size (25MB). Please select a smaller file.'
      );
      return;
    }

    // Extract values for the request body
    const scanningOption = values.scanning ? values.scanning.join(', ') : '';
    const duplicateHandle = values.duplicateHandle;

    const requestBody = {
      scanningOption,
      duplicateHandle,
      file: selectedFile,
    };

    console.log('Request body:', requestBody);

    // Call the handleImportAPI function to handle API import file
    try {
      // Call API
      // const res = handleImportAPI(requestBody);
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
    // Reset selectedFile after form submission
    setSelectedFile(null);

    // Reset file input value
    fileInputRef.current.value = null;
  };

  const truncateFileName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
  };

  const formItemLayout = {};

  return (
    <>
      <Button
        icon={<UploadOutlined />}
        onClick={() => setIsOpen(true)}
        style={{
          borderRadius: '12px',
          color: 'white',
          backgroundColor: '#D45B13',
          marginRight: '0.5rem',
        }}
      >
        Import
      </Button>
      <Modal
        style={{
          width: '40rem',
          padding: 0,
        }}
        title={
          <Typography style={{ color: 'white', textAlign: 'center', fontSize: '16px' }}>
            Import Syllabus
          </Typography>
        }
        visible={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        footer={null}
        destroyOnClose
      >
        <Form onFinish={handleFormSubmit} layout='horizontal' form={form}>
          {/* Import settings */}
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
                  onClick={handleSelectButtonClick}
                  style={{
                    width: '5rem',
                    color: 'white',
                    borderRadius: '6px',
                    textAlign: 'center',
                    backgroundColor: '#2D3748',
                    cursor: 'pointer', // Add cursor pointer to indicate it's clickable
                  }}
                >
                  {selectedFile ? truncateFileName(selectedFile.name, 10) : 'Select'}
                </p>
                <input
                  ref={fileInputRef} // Set the ref to the file input
                  id='fileInput'
                  type='file'
                  accept='.csv'
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  multiple={false} // Only allow selecting one file at a time
                  maxfilesize={25 * 1024 * 1024} // Maximum file size in bytes (25MB)
                />
                <Select placeholder='Auto detect' size='small' />
                <Select placeholder='Comma' size='small' />
                <Link
                  to='https://docs.google.com/spreadsheets/d/17BLVaMDJjkCSlA5_0zcF87xgCN8ZAVEX/edit?usp=sharing&ouid=116512351481329534388&rtpof=true&sd=true'
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

          {/* Duplicate control */}
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
                <Form.Item name='duplicateHandle' initialValue='1' noStyle>
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

          {/* Buttons */}
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
