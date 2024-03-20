import React, { useRef, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Select,
  Space,
  Flex,
  Typography,
  notification,
  Spin, // Import Spin component
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const ImportSyllabusModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // State to control loading overlay
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Directly access the selected file
    setSelectedFile(file);
  };

  const handleSelectButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImportAPI = async (requestBody) => {
    const formData = new FormData(); // Create a FormData object

    // Append the file to the FormData object
    formData.append('file', requestBody.file);

    // Append the optionModel as a JSON string to the FormData object
    formData.append('optionModel', JSON.stringify(requestBody.optionModel));

    try {
      const response = await axios.post(
        `http://fams-group1-net03.ptbiology.com/api/syllabus/import`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error while importing syllabus:', error);
      throw error;
    }
  };

  // Handle Submit here!
  const handleFormSubmit = async (values) => {
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
    let scanningOption = values.scanning ? values.scanning.join(', ') : '';
    const duplicateHandle = values.duplicateHandle;

    if (scanningOption === '') {
      // scaning will do not anything
      scanningOption = 0;
    } else if (scanningOption === 'Syllabus name') {
      // Scanning with Name
      scanningOption = 2;
    } else if (scanningOption === 'Syllabus code') {
      // Scanning with code
      scanningOption = 1;
    } else {
      // Scanning with both name and code
      scanningOption = 3;
    }

    const requestBody = {
      file: selectedFile,
      optionModel: { scanningOption: scanningOption, dupplicateOption: duplicateHandle },
    };

    console.log('Request body:', requestBody);

    setLoading(true); // Set loading state to true when submitting the form

    try {
      // Call the handleImportAPI function to handle API import file
      const res = await handleImportAPI(requestBody);
      if (res.isSuccess) {
        notification.success({
          message: `Syllabus import successfully!`,
        });
      } else {
        notification.error({
          message: 'Syllabus duplication failed!',
          description: `${res.message}. An unexpected error occurred. Please try again.`,
        });
      }
    } catch (error) {
      console.error('Error occurred during API call:', error);
    } finally {
      setLoading(false); // Set loading state to false after API call is complete
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
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        footer={null}
        destroyOnClose
      >
        <Spin spinning={loading}>
          {' '}
          {/* Wrap the Modal content with Spin component */}
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
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Accept only xlsx files
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
                  <Form.Item name='duplicateHandle' initialValue={1} noStyle>
                    <Radio.Group>
                      <Radio value={1}>Allow</Radio>
                      <Radio value={2}>Replace</Radio>
                      <Radio value={3}>Skip</Radio>
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
        </Spin>
      </Modal>
    </>
  );
};

export default ImportSyllabusModal;
