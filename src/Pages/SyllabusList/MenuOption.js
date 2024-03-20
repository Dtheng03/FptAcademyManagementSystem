import React, { useState } from 'react';
import axios from 'axios';
import { Menu, Popover, notification, Modal, Spin } from 'antd';
import {
  PlusCircleOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const MenuOption = ({ item, apiData, setApiData, status }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState('');
  const [loading, setLoading] = useState(false); // State for loading overlay

  const navigate = useNavigate();

  const items = [
    getItem('Add training program', 'Add training program', <PlusCircleOutlined />),
    getItem('Edit syllabus', 'Edit syllabus', <EditOutlined />),
    (status === 'Drafting' || status === 'Inactive') &&
      getItem('Active syllabus', 'Update Active', <EyeOutlined />),
    status === 'Active' && getItem('Duplicate syllabus', 'Duplicate', <CopyOutlined />),
    (status === 'Active' || status === 'Drafting') &&
      getItem('De-active syllabus', 'Update Inactive', <EyeInvisibleOutlined />),
    (status === 'Active' || status === 'Inactive') &&
      getItem('Turn into Draft', 'Update Drafting', <FormOutlined />),
  ];

  const showModal = () => {
    setIsVisible(true);
  };

  const handleMenuClick = (e) => {
    if (e.key === 'Add training program') {
      navigate('/create-program');
    }

    if (e.key === 'Edit syllabus') {
      navigate('/view-syllabus-detail/' + item.id);
    }

    setAction(e.key);
    showModal();
  };

  const handleOk = async () => {
    setIsVisible(false);
    setLoading(true); // Show loading overlay

    // Perform action based on selected menu item
    if (action === 'Duplicate') {
      const selectedSyllabus = item;
      await handleDuplicate(selectedSyllabus);
    } else if (action.includes('Update')) {
      const syllabusId = item.id;
      await handleUpdate(syllabusId, action.split(' ')[1]);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleDuplicate = async (selectedSyllabus) => {
    try {
      const response = await axios.post(
        `http://fams-group1-net03.ptbiology.com/api/syllabus/duplicate-syllabus?syllabusId=${selectedSyllabus.id}`
      );
      if (response.data.code === 200) {
        var currentDate = new Date();
        var createOnDate = currentDate.toISOString().split('T')[0];
        const fullName = sessionStorage.getItem('fullName');
        const dataDuplicate = {
          id: response.data.data.id,
          syllabus: response.data.data.syllabusName,
          code: response.data.data.code,
          createdOn: createOnDate,
          createdBy: { fullName },
          duration: response.data.data.duration,
          outputStandard: response.data.data.outputStandard.map((item) => item.objectiveCode),
          status: response.data.data.status,
        };
        setApiData([dataDuplicate, ...apiData]);
        showSuccessNotification();
      }
    } catch (error) {
      console.log(error);
      showErrorNotification(error);
    }
  };

  const handleUpdate = async (syllabusId, action) => {
    try {
      await axios.put(
        `http://fams-group1-net03.ptbiology.com/api/syllabus/active-deactive-syllabus?syllabusId=${syllabusId}&newStatus=${action}`
      );

      const reponse = await axios.get(
        'http://fams-group1-net03.ptbiology.com/api/syllabus/view-syllabus-list?filter-by=Active&filter-by=Inactive&filter-by=Drafting'
      );
      setApiData(reponse.data.data);
      notification.success({
        message: 'Syllabus update successfully!',
      });
    } catch (error) {
      notification.error({
        message: 'Update syllabus failed!',
        description: 'Please try again',
      });
    }
  };

  const showSuccessNotification = (message = 'duplicated') => {
    notification.success({
      message: `Syllabus ${message} successfully!`,
    });
  };

  const showErrorNotification = (error) => {
    notification.error({
      message: 'Syllabus duplication failed!',
      description: error ? `Server error` : 'An unexpected error occurred. Please try again.',
    });
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      style={{
        width: 256,
      }}
      mode='inline'
      items={items}
    />
  );

  return (
    <>
      <Spin
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '9999',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
        spinning={loading}
      >
        <Modal
          title='Confirm action'
          open={isVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: loading }} // Disable Ok button while loading
          cancelButtonProps={{ disabled: loading }} // Disable Cancel button while loading
        >
          <p>Are you sure for {action.toLowerCase()}?</p>
        </Modal>
        <Popover trigger='click' content={menu}>
          {' '}
          {/* Show Spin component while loading */}
          <p className='button-options'>...</p>
        </Popover>
      </Spin>
    </>
  );
};

export default MenuOption;
