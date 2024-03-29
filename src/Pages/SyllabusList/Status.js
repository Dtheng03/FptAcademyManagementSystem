import React from 'react';
import { Button, ConfigProvider } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

export const Status = ({ data }) => {
  let color = '#2D3748';
  let icon = false;
  if (data === 'Active') {
  } else if (data === 'Inactive') {
    color = '#B9B9B9';
  } else if (data === 'Drafting') {
    color = '#285D9A';
  }
  return (
    <Button className='btn-cus' style={{ backgroundColor: `${color}` }} type='primary'>
      {data}
      {icon && <CloseCircleOutlined />}
    </Button>
  );
};
