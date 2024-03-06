import React, { useState } from 'react';
import { Button, Popover, DatePicker as AntDatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';

const CalendarPopover = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    let startDate;
    let endDate;
    if (start != null) {
      startDate = format(start, 'dd/MM/yyyy');
    }
    if (end != null) {
      endDate = format(end, 'dd/MM/yyyy');
    }
    if (startDate && endDate) {
      onDateRangeChange([startDate, endDate]);
    }
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
            onDateRangeChange={handleDateChange}
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
