import React, { useState } from 'react';
import axios from 'axios';
import { Menu, Popover, notification, Modal } from 'antd';
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

  const navigate = useNavigate();

  // Check condition is status is active or inactive or drafting
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
    setIsVisible(false);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);

      // Move the logic inside the setTimeout callback
      if (action === 'Duplicate') {
        // Get the selected syllabus data
        const selectedSyllabus = item;
        handleDuplicate(selectedSyllabus);
      } else if (action.includes('Update')) {
        // Get the syllabus item
        const syllabusId = item.id;
        handleUpdate(syllabusId, action.split(' ')[1]);
      }
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
    setIsVisible(false);
    setOk(false);
  };

  // Notification Section
  // Define a separate function for showing success notification
  const showSuccessNotification = (message = 'duplicated') => {
    notification.success({
      message: `Syllabus ${message} successfully!`,
    });
  };

  // Define a separate function for showing error notification
  const showErrorNotification = (error) => {
    notification.error({
      message: 'Syllabus duplication failed!',
      description: error ? `Server error` : 'An unexpected error occurred. Please try again.',
    });
  };

  const handleDuplicate = async (selectedSyllabus) => {
    // Make a POST request to duplicate the syllabus
    try {
      const response = await axios.post(
        `http://fams-group1-net03.ptbiology.com/api/syllabus/duplicate-syllabus?syllabusId=${selectedSyllabus.id}`
      );
      if (response.data.code === 200) {
        var currentDate = new Date();
        var createOnDate = currentDate.toISOString().split('T')[0];
        const fullName = sessionStorage.getItem('fullName');
        // Copy data from the selected syllabus or modify as needed
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
        // Update Successfully
        setApiData([dataDuplicate, ...apiData]);
        showSuccessNotification();
      }
    } catch (error) {
      console.log(error);
      showErrorNotification(error);
    }
  };

  const handleUpdate = async (syllabusId, action) => {
    console.log('syllabusId', syllabusId);
    // Make a DELETE request to remove the syllabus from the mock API
    try {
      await axios.put(
        `http://fams-group1-net03.ptbiology.com/api/syllabus/active-deactive-syllabus?syllabusId=${syllabusId}&newStatus=${action}`
      );

      const reponse = await axios.get(
        'http://fams-group1-net03.ptbiology.com/api/syllabus/view-syllabus-list?filter-by=Active&filter-by=Inactive&filter-by=Drafting'
      );
      // Update the state by removing the deleted syllabus
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

  const handleMenuClick = (e) => {
    // Handle the click on menu items

    if (e.key === 'Add training program') {
      // CHƯA CÓ PAGE CREATE TRAINING PROGRAM
      navigate('/create-program');
    }

    if (e.key === 'Edit syllabus') {
      navigate('/view-syllabus-detail/' + item.id);
    }

    setAction(e.key);
    showModal();
    setModalText(`Are you sure for ${e.key.toLowerCase()} ?`);
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
      <Modal
        title='Confirm action'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
      <Popover
        open={isVisible}
        onOpenChange={() => setIsVisible(!isVisible)}
        trigger={'click'}
        content={menu}
      >
        <p className='button-options'>...</p>
      </Popover>
    </>
  );
};

export default MenuOption;
