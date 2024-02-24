import React, { useState } from 'react';
import { Button, DatePicker, Space, Popover } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const CalendarPopover = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const handleDateChange = (dates) => {
    setSelectedDateRange(dates);
  };

  const clearDate = () => {
    setSelectedDateRange(null);
  };

  const formatDateString = (date) => {
    if (!date || !date[0] || !date[1]) return 'Create date';

    const inputDate = new Date(date[0]);
    const inputDate2 = new Date(date[1]);

    const formattedDate = `${inputDate.getDate()}/${
      inputDate.getMonth() + 1
    }/${inputDate.getFullYear()}`;

    const formattedDate2 = `${inputDate2.getDate()}/${
      inputDate2.getMonth() + 1
    }/${inputDate2.getFullYear()}`;

    const result = `${formattedDate} - ${formattedDate2}`;

    return result;
  };

  return (
    <Popover
      open={isPopoverVisible}
      onOpenChange={(visible) => setPopoverVisible(visible)}
      content={
        <Space direction='vertical' style={{ width: '300px' }}>
          <DatePicker.RangePicker
            value={selectedDateRange}
            onChange={handleDateChange}
            format='DD/MM/YYYY'
          />
          <Button onClick={clearDate} size='small' danger>
            Clear
          </Button>
        </Space>
      }
      trigger='click'
    >
      <Button shape='round' icon={<CalendarOutlined />} style={{ width: '240px' }}>
        {formatDateString(selectedDateRange)}
      </Button>
    </Popover>
  );
};

export default CalendarPopover;
