import React, { useState } from 'react';
import axios from 'axios';
import { Button, Menu, Popover, Dropdown } from 'antd';
import { PlusCircleOutlined, EditOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';

const menuOptions = [
  { icon: <PlusCircleOutlined />, name: 'Add training program' },
  { icon: <EditOutlined />, name: 'Edit syllabus' },
  { icon: <CopyOutlined />, name: 'Duplicate syllabus' },
  { icon: <DeleteOutlined />, name: 'Delete syllabus' },
];

const MenuOption = ({ item, apiData, setApiData }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMenuClick = async (e) => {
    // Handle the click on menu items
    console.log(`Clicked on option: ${e.key}`);
    if (e.key === 'Duplicate syllabus') {
      // Get the selected syllabus data
      const selectedSyllabus = item;

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

        console.log('Syllabus duplicated successfully:', response.data);
      } catch (error) {
        console.error('Error duplicating syllabus:', error);
      }
    } else if (e.key === 'Delete syllabus') {
      // Get the syllabus item
      const syllabusId = item.id;

      // Make a DELETE request to remove the syllabus from the mock API
      try {
        await axios.delete(
          `https://6541299af0b8287df1fdf263.mockapi.io/Syllabus-API/${syllabusId}`
        );

        // Update the state by removing the deleted syllabus
        setApiData(apiData.filter((item) => item.id !== syllabusId));

        console.log('Syllabus deleted successfully:', syllabusId);
      } catch (error) {
        console.error('Error deleting syllabus:', error);
      }
    }
  };

  const menu = (
    <Menu className='d-md-none' onClick={handleMenuClick}>
      {menuOptions.map((o) => (
        <Menu.Item style={{ fontSize: '16px' }} key={o.name}>
          {React.cloneElement(o.icon, { className: 'icon-option' })}
          <span style={{ color: '#2C5282' }}>{o.name}</span>
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
      <p className='button-options'>...</p>
    </Popover>
  );
};

export default MenuOption;
