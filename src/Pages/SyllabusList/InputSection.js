import React, { useState, useEffect } from 'react';
import { Input, Button, Flex, AutoComplete, Tag } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import CalendarPopover from './CalendarPopover';
import ImportSyllabusModal from './ImportModal';

const InputSection = ({ apiData, searchInput, setSearchBy, onSearchInputChange }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (apiData) {
      const filteredSuggestions = apiData.filter((item) => {
        const syllabusMatch = item.syllabus.includes(searchInput);
        const codeMatch = item.code.includes(searchInput);
        const createdByMatch = item.createdBy.includes(searchInput);

        return syllabusMatch || codeMatch || createdByMatch;
      });

      const mappedSuggestions = filteredSuggestions
        .map((item, index) => ({
          value: item.syllabus,
          key: `syllabus_${item.syllabus}_${index}`,
        }))
        .concat(
          filteredSuggestions.map((item, index) => ({
            value: item.code,
            key: `code_${item.code}_${index}`,
          }))
        )
        .concat(
          filteredSuggestions.map((item, index) => ({
            value: item.createdBy,
            key: `createdby_${item.createdBy}_${index}`,
          }))
        );
      setSuggestions(mappedSuggestions);
    }
  }, [apiData, searchInput]);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleImportClick = () => {
    showModal();
  };

  const onSelect = (value) => {
    setSearchBy(suggestions.find((i) => i.value === value).key);
    onSearchInputChange(value);

    // Add the selected tag
    setSelectedTags((prevTags) => [...prevTags, value]);
  };

  const handleTagClose = (tag) => {
    // Remove the selected tag
    setSearchBy('');
    onSearchInputChange('');
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <Flex justify='space-between' style={{ width: '100%' }}>
      {/* Left side */}
      <Flex justify='space-between' vertical style={{ width: '36rem' }}>
        <Flex>
          <AutoComplete
            style={{ width: '26rem', marginRight: '1rem' }}
            value={searchInput.value}
            options={suggestions.map((item) => ({ value: item.value, key: item.key }))}
            onSelect={onSelect}
            onChange={(value) => onSearchInputChange(value)}
          >
            <Input
              placeholder='Search...'
              style={{ marginRight: '16px' }}
              prefix={<SearchOutlined />}
            />
          </AutoComplete>
          <CalendarPopover />
        </Flex>
        <Flex style={{ marginTop: '16px' }}>
          {/* Display selected tags */}
          {selectedTags.map((tag) => (
            <Tag
              style={{ padding: '0.2rem 0.8rem' }}
              color='#474747'
              key={tag}
              closable
              onClose={() => handleTagClose(tag)}
            >
              {tag}
            </Tag>
          ))}
        </Flex>
      </Flex>

      {/* Right side */}
      <div>
        {/* Modal */}
        <ImportSyllabusModal visible={isModalVisible} onCancel={handleCancel} />
        <Button
          style={{ backgroundColor: '#2D3748' }}
          type='primary'
          icon={<PlusCircleOutlined />}
          onClick={handleImportClick}
        >
          Add Syllabus
        </Button>
      </div>
    </Flex>
  );
};

export default InputSection;
