import React, { useState } from 'react';
import { Input, Button, Calendar, Flex } from 'antd';
import { SearchOutlined, PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';
import CalendarPopover from './CalendarPopover';
import ImportSyllabusModal from './ImportModal';

const InputSection = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleImportClick = () => {
    // Additional logic before showing the modal, if needed
    showModal();
  };
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Flex justify='space-between' style={{ width: '100%' }}>
      {/* Left side */}
      <div>
        <Input
          placeholder='Search...'
          value={searchInput}
          onChange={handleSearchInputChange}
          style={{ marginRight: '16px' }}
          prefix={<SearchOutlined />}
        />
        <CalendarPopover />
      </div>

      {/* Right side */}
      <div>
        {/* Modal */}
        <ImportSyllabusModal visible={isModalVisible} onCancel={handleCancel} />
        <Button type='primary' icon={<PlusOutlined />}>
          Add Syllabus
        </Button>
      </div>
    </Flex>
  );
};

export default InputSection;
