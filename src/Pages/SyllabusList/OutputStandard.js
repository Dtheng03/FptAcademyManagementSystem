import React from 'react';
import { Button } from 'antd';

export const OutputStandard = ({ data }) => {
  return (
    <Button
      style={{ backgroundColor: '#2d3748', borderRadius: '12px', margin: '0.2rem' }}
      type='primary'
    >
      {data}
    </Button>
  );
};
