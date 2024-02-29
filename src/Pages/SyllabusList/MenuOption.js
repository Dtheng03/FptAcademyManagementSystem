import React, { useState } from 'react';
import axios from 'axios';
import { Button, Menu, Popover, Dropdown, notification, Modal } from 'antd';
import { PlusCircleOutlined, EditOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const menuOptions = [
  { icon: <PlusCircleOutlined />, name: 'Add training program' },
  { icon: <EditOutlined />, name: 'Edit syllabus' },
  { icon: <CopyOutlined />, name: 'Duplicate syllabus' },
  { icon: <DeleteOutlined />, name: 'Delete syllabus' },
];

const MenuOption = ({ item, apiData, setApiData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState('');

  const navigate = useNavigate();

  // Section for Modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOk(true);
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);

      // Move the logic inside the setTimeout callback
      if (ok) {
        if (action === 'Duplicate syllabus') {
          // Get the selected syllabus data
          const selectedSyllabus = item;
          handleDuplicate(selectedSyllabus);
        } else if (action === 'Delete syllabus') {
          // Get the syllabus item
          const syllabusId = item.id;
          handleDelete(syllabusId);
        }
      }
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
    setOk(false);
  };

  const handleDuplicate = async (selectedSyllabus) => {
    // Make a POST request to duplicate the syllabus
    try {
      const response = await axios.post(
        'https://6541299af0b8287df1fdf263.mockapi.io/Syllabus-API',
        {
          // Copy data from the selected syllabus or modify as needed
          syllabus: selectedSyllabus.syllabus,
          code: selectedSyllabus.code,
          createdOn: new Date().toISOString(),
          createdBy: selectedSyllabus.createdBy,
          duration: selectedSyllabus.duration,
          outputStandard: selectedSyllabus.outputStandard,
          status: selectedSyllabus.status,
        }
      );

      // Update the state with the new data
      setApiData([...apiData, response.data]);

      notification.success({
        message: 'Syllabus duplicated successfully!',
      });
    } catch (error) {
      notification.error({
        message: 'Syllabus duplicated failed!',
        description: 'Try Again!',
      });
    }
  };

  const handleDelete = async (syllabusId) => {
    // Make a DELETE request to remove the syllabus from the mock API
    try {
      await axios.delete(`https://6541299af0b8287df1fdf263.mockapi.io/Syllabus-API/${syllabusId}`);

      // Update the state by removing the deleted syllabus
      setApiData(apiData.filter((item) => item.id !== syllabusId));
      notification.success({
        message: 'Syllabus deleted successfully!',
      });
    } catch (error) {
      notification.error({
        message: 'Delete syllabus failed!',
        description: 'Please try again',
      });
    }
  };

  const handleMenuClick = (e) => {
    // Handle the click on menu items

    if (e.key === 'Add training program') {
      // CHƯA CÓ PAGE CREATE TRAINING PROGRAM
      navigate('/create-training-program');
    }

    if (e.key === 'Edit syllabus') {
      navigate('/view-syllabus-detail');
    }

    setAction(e.key);
    showModal();
    setModalText('Are you sure for ' + `${e.key.toLowerCase()}` + '?');
  };

  const menu = (
    <Menu className='d-md-none' onClick={handleMenuClick}>
      {menuOptions.map((o) => (
        <Menu.Item key={o.name}>
          {React.cloneElement(o.icon, { className: 'icon-option' })}
          <span style={{ color: '#2C5282', fontSize: '14px' }}>{o.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Popover
      open={isVisible}
      onOpenChange={(visible) => setIsVisible(visible)}
      trigger='click'
      content={menu}
    >
      <Modal
        title='Confirm action'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
      <p className='button-options'>...</p>
    </Popover>
  );
};

export default MenuOption;
