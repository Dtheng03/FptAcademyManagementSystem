import React, { useEffect, useState } from 'react';
import { ConfigProvider, Flex, Modal, Spin, Table, Typography } from 'antd';
import './SyllabusList.scss';
import { OutputStandard } from './OutputStandard';
import { Status } from './Status';
import { FilterOutlined } from '@ant-design/icons';
import axios from 'axios';
import InputSection from './InputSection';
import MenuOption from './MenuOption';
import { useNavigate } from 'react-router-dom';

const SyllabusList = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState();
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [searchByDateRange, setSearchByDateRange] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSort = (columnKey) => {
    let sortOrder =
      sortedInfo.columnKey === columnKey && sortedInfo.order === 'ascend' ? 'descend' : 'ascend';
    setSortedInfo({ columnKey, order: sortOrder });
  };
  let data = [];

  useEffect(() => {
    setLoading(true); // Set loading to true when starting to fetch data
    axios.get('https://6541299af0b8287df1fdf263.mockapi.io/Syllabus-API').then((response) => {
      setApiData(response.data);
      setLoading(false); // Set loading to false when data is received
    });
  }, []);

  let params;
  // handle Search Input
  useEffect(() => {
    params = {};
    if (searchBy.trim() !== '') {
      if (searchBy.includes('syllabus_')) {
        params = {
          syllabus: searchInput,
        };
      }
      if (searchBy.includes('code_')) {
        params = {
          code: searchInput,
        };
      }
      if (searchBy.includes('createdby_')) {
        params = {
          createdBy: searchInput,
        };
      }
    } else {
      params = {
        syllabus: '',
        code: '',
        createdBy: '',
      };
    }

    axios
      .get('https://6541299af0b8287df1fdf263.mockapi.io/Syllabus-API', {
        params,
      })
      .then((response) => {
        setApiData(response.data);
      });
  }, [searchBy]);

  useEffect(() => {
    console.log('hehe');
  }, [searchByDateRange]);

  // data from API
  if (apiData) {
    data = apiData.map((item) => {
      return {
        key: item.id,
        id: item.id,
        syllabus: (
          <Typography onClick={() => navigate('/view-syllabus-detail/' + item.id)}>
            {item.syllabus}
          </Typography>
        ),
        code: item.code,
        createdOn: new Date(item.createdOn).toLocaleDateString('en-GB'),
        createdBy: item.createdBy,
        duration: item.duration,
        outputStandard: item.outputStandard.map((o) => <OutputStandard key={o} data={o} />),
        status: <Status data={item.status} />,
        options: <MenuOption apiData={apiData} item={item} setApiData={setApiData} />,
      };
    });
  }

  const sortedData = data.sort((a, b) => {
    const columnKey = sortedInfo.columnKey;
    const order = sortedInfo.order === 'ascend' ? 1 : -1;

    // Add custom logic for sorting based on column key
    if (columnKey === 'syllabus') {
      return a.syllabus.localeCompare(b.syllabus) * order;
    } else if (columnKey === 'code') {
      return a.code.localeCompare(b.code) * order;
    } else if (columnKey === 'createdOn') {
      return new Date(a.createdOn) - new Date(b.createdOn) * order;
    } else if (columnKey === 'createdBy') {
      return a.createdBy.localeCompare(b.createdBy) * order;
    } else if (columnKey === 'duration') {
      return a.duration - b.duration * order;
    }

    return 0; // Default case
  });

  const columns = [
    {
      title: (
        <p className='table-title-header' onClick={() => handleSort('syllabus')}>
          Syllabus <FilterOutlined />
        </p>
      ),
      dataIndex: 'syllabus',
      key: 'syllabus',
      className: 'cell-cus',
      sortOrder: sortedInfo.columnKey === 'syllabus' && sortedInfo.order,
    },
    {
      title: (
        <p className='table-title-header' onClick={() => handleSort('code')}>
          Code <FilterOutlined />
        </p>
      ),
      dataIndex: 'code',
      key: 'code',
      className: 'cell-cus',
      sortOrder: sortedInfo.columnKey === 'code' && sortedInfo.order,
    },
    {
      title: (
        <p className='table-title-header' onClick={() => handleSort('createdOn')}>
          Created on <FilterOutlined />
        </p>
      ),
      dataIndex: 'createdOn',
      key: 'createdOn',
      className: 'cell-cus',
      sortOrder: sortedInfo.columnKey === 'createdOn' && sortedInfo.order,
    },
    {
      title: (
        <p className='table-title-header' onClick={() => handleSort('createdBy')}>
          Created by <FilterOutlined />
        </p>
      ),
      dataIndex: 'createdBy',
      key: 'createdBy',
      className: 'cell-cus',
      sortOrder: sortedInfo.columnKey === 'createdBy' && sortedInfo.order,
    },
    {
      title: (
        <p className='table-title-header' onClick={() => handleSort('duration')}>
          Duration <FilterOutlined />
        </p>
      ),
      dataIndex: 'duration',
      key: 'duration',
      className: 'cell-cus',
      sortOrder: sortedInfo.columnKey === 'duration' && sortedInfo.order,
    },
    {
      title: 'Output standard',
      dataIndex: 'outputStandard',
      key: 'outputStandard',
      className: 'cell-cus',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'cell-cus',
    },
    {
      dataIndex: 'options',
      key: 'options',
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
          padding: 8,
        },
        components: {
          Table: {
            rowHoverBg: 'rgba(0,0,0,0.05)',
            headerBg: '#2D3748',
            headerColor: '#fff',
          },
          Column: {
            onHeaderCell: 'none',
            headerSortHoverBg: 'rgba(255, 255, 0, 0.5)',
          },
          Modal: {
            headerBg: '#2D3748',
            headerColor: '#fff',
            titleColor: '#fff',
            wireframe: true,
          },
        },
      }}
    >
      <Flex gap={'4rem'} style={{ width: '100%', padding: '2rem' }} vertical>
        <Flex gap={'2rem'} vertical>
          <h4 style={{ margin: '0' }}>Syllabus</h4>
          <InputSection
            apiData={apiData}
            searchInput={searchInput}
            setSearchBy={setSearchBy}
            setSearchByDateRange={setSearchByDateRange}
            onSearchInputChange={setSearchInput}
          />
        </Flex>
        <Spin spinning={loading} tip='Loading...'>
          <Table
            pagination={{
              position: ['bottomCenter'],
              style: {
                textAlign: 'center',
              },
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
            columns={columns}
            dataSource={data}
          />
        </Spin>
      </Flex>
    </ConfigProvider>
  );
};
export default SyllabusList;
