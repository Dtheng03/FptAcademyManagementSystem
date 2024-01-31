import React from 'react';
import { Button } from 'antd';

const StatusButton = ({ online }) => {
  const buttonStyle = {
    backgroundColor: online ? 'transparent' : '#2D3748',
    color: online ? 'orange' : 'white',
    border: ` 2px solid ${online ? 'orange' : 'white'}`,
    borderRadius: '15px',
  };

  return <Button style={buttonStyle}>{online ? 'Online' : 'Offline'}</Button>;
};

// Example usage:
// For online status
export const OnlineStatus = () => <StatusButton online={true} />;

// For offline status
export const OfflineStatus = () => <StatusButton online={false} />;
