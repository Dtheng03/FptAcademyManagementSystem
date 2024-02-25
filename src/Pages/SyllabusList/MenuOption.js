import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { PlusCircleOutlined, EditOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';

const menuOptions = [
  { icon: <PlusCircleOutlined />, name: 'Add training program' },
  { icon: <EditOutlined />, name: 'Edit syllabus' },
  { icon: <CopyOutlined />, name: 'Duplicate syllabus' },
  { icon: <DeleteOutlined />, name: 'Delete syllabus' },
];

const MenuOption = () => {
  const handleMenuClick = (e) => {
    // Handle the click on menu items
    console.log(`Clicked on option: ${e.key}`);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuOptions.map((o) => (
        <Menu.Item style={{ fontSize: '16px' }} key={o.name}>
          {React.cloneElement(o.icon, { className: 'icon-option' })}
          <span style={{ color: '#2C5282' }}>{o.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement='bottomLeft' trigger={['click']}>
      <p className='button-options'>...</p>
    </Dropdown>
  );
};

export default MenuOption;
