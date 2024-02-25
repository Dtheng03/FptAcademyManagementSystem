import React, { useState } from 'react';
import { Button, Popover, DatePicker as AntDatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';

const CalendarPopover = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const clearDate = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const formattedDateRange =
    startDate && endDate
      ? `${format(startDate, 'dd/MM/yyyy')} - ${format(endDate, 'dd/MM/yyyy')}`
      : '';

  return (
    <Popover
      open={isVisible}
      onOpenChange={(visible) => setIsVisible(visible)}
      trigger='click'
      content={
        <>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '8px' }}>
            <Button onClick={clearDate} size='small' danger>
              Clear
            </Button>
            <Button onClick={() => setIsVisible(false)} size='small'>
              Close
            </Button>
          </div>
        </>
      }
    >
      <Button
        style={{
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          width: '240px',
        }}
      >
        <CalendarOutlined />
        {formattedDateRange || 'Created date'}
      </Button>
    </Popover>
  );
};

export default CalendarPopover;
