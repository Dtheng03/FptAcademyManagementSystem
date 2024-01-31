import React from 'react';
import { Switch, ConfigProvider } from 'antd';

function SwitchButton({ checkedChildren, unCheckedChildren }) {
  return (
    < ConfigProvider
      theme={{
        token: {
          lineHeight: 1.7,
        },
        components: {
          Switch: {
            trackHeight: 24,
          },
        },
      }
      }
    >
      <Switch checkedChildren={checkedChildren} unCheckedChildren={unCheckedChildren} />
    </ConfigProvider >
  )
};

export default SwitchButton;